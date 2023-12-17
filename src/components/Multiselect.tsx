import React, {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styles from './Multiselect.module.scss'
import clsx from 'clsx'
import { debounce, sortBy, truncate, uniqBy } from 'lodash'
import slugify from 'slugify'

export interface ChoiceItem extends Record<string, unknown> {
  id: number | string
  label: string
}
interface FilteredChoiceItem extends ChoiceItem {
  order?: number
}
type MultiselectProps = {
  choices: ChoiceItem[]
  defaultOpen?: boolean
  noSearchIcon?: boolean
  customSearchIcon?: ReactElement
  saveToLocaleStorage?: boolean
  inputDebounce?: number
  loading?: boolean
  error?: Error | null
  searchType?: 'submit' | 'change'
  searchButtonClasses?: string
  searchButtonText?: string
  renderChoiceItem?: (choiceItem: ChoiceItem) => ReactElement
  renderSelectedChoiceItem?: (selectedChoiceItem: ChoiceItem) => ReactElement
  onSelectedsChange?: (items: ChoiceItem[]) => void
  onInputValChange?: (val: string) => void | string
  renderFilterMessage?: (
    filteredItems: ChoiceItem[],
    inputVal: string
  ) => string | ReactElement
}

const DefaultSearchIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx(styles.searchIcon, styles.defaultSearchIcon)}
  >
    <path
      d="M13.8 12.2l-3.9-4c.6-.8 1.1-2 1.1-3.1 0-2.8-2.3-5-5-5-2.8 0-5 2.3-5 5 0 2.8 2.2 5 5 5 .8 0 1.7-.2 2.3-.5l3.9 4.3c.2.2.6.2.8 0l.8-.8c.3-.3.3-.7 0-.9zM6 8.1c-1.7 0-3-1.4-3-3 0-1.7 1.4-3 3-3s3 1.4 3 3-1.4 3-3 3z"
      fillRule="evenodd"
    />
  </svg>
)
const Multiselect = ({
  choices,
  customSearchIcon,
  noSearchIcon,
  defaultOpen,
  saveToLocaleStorage = true,
  inputDebounce = 50,
  onInputValChange,
  renderFilterMessage,
  renderChoiceItem,
  renderSelectedChoiceItem,
  onSelectedsChange,
  loading,
  error,
  searchType = 'submit',
  searchButtonClasses,
  searchButtonText = 'Search',
}: MultiselectProps) => {
  const [isResultOpen, setIsResultOpen] = useState<boolean>(
    defaultOpen || false
  )
  const [inputVal, setInputVal] = useState<string>('')
  const [selecteds, setSelecteds] = useState<ChoiceItem[]>(
    saveToLocaleStorage
      ? localStorage.getItem('selectedItems')
        ? JSON.parse(localStorage.getItem('selectedItems') || '[]')
        : []
      : []
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const getQueryText = (val: string) =>
    slugify(val, {
      lower: true,
      trim: true,
      remove: /[*+~.()'"!:@]/g,
    })
  const searchIcon: null | ReactElement = useMemo(() => {
    if (noSearchIcon) return null
    if (!customSearchIcon) return DefaultSearchIcon
    return React.cloneElement(customSearchIcon, { ...customSearchIcon.props })
  }, [customSearchIcon, noSearchIcon])

  const filteredChoices: {
    selectedChoices: ChoiceItem[]
    nonSelectedChoices: FilteredChoiceItem[]
    searchResults: FilteredChoiceItem[]
  } = useMemo(() => {
    const searchText = getQueryText(inputVal)

    const selectedIds = selecteds.map((item) => item.id)

    const nonSelectedChoices = sortBy(
      choices.filter((item) => !selectedIds.includes(item.id)),
      ['label']
    )
    const selectedChoices = sortBy(
      choices.filter((item) => selectedIds.includes(item.id)),
      ['label']
    )

    if (!searchText && !isResultOpen)
      return { selectedChoices, nonSelectedChoices: [], searchResults: [] }

    if (!searchText && isResultOpen)
      return {
        selectedChoices,
        nonSelectedChoices,
        searchResults: [],
      }

    const filteredNonSelectedChoices = nonSelectedChoices
      .map((item, i) => {
        const query = getQueryText(item.label)
        if (!query) return false

        const words = searchText.split('-')
        const includedWords = words.filter((word) => query.includes(word))

        if (includedWords.length > 0) {
          return { ...item, order: includedWords.length }
        }
        return undefined
      })
      .filter((item) => item) as FilteredChoiceItem[]

    const sortedNonSelectedChoices = sortBy(filteredNonSelectedChoices, [
      'order',
    ]).reverse()

    const filteredAllSelectedChoices = choices
      .map((item, i) => {
        const query = getQueryText(item.label)
        if (!query) return false

        const words = searchText.split('-')
        const includedWords = words.filter((word) => query.includes(word))

        if (includedWords.length > 0) {
          return { ...item, order: includedWords.length }
        }
        return undefined
      })
      .filter((item) => item) as FilteredChoiceItem[]

    return {
      selectedChoices,
      nonSelectedChoices: sortedNonSelectedChoices,
      searchResults: filteredAllSelectedChoices,
    }
  }, [choices, inputVal, selecteds, isResultOpen])

  const inputValChange = useMemo(() => {
    return debounce((value: string) => {
      setInputVal(value)
    }, inputDebounce)
  }, [inputDebounce])

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (error) return
      if (onInputValChange) {
        onInputValChange(e.target.value)
      }
      if (searchType === 'submit') return
      inputValChange(e.target.value)
    },
    [onInputValChange, inputValChange, error, searchType]
  )

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        if (error) return
        if (searchType === 'change') return
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
          inputValChange(e.currentTarget.value)
        }
      },
      [inputValChange, error, searchType]
    )

  const handleSearchButtonClick: MouseEventHandler<
    HTMLButtonElement | HTMLElement
  > = useCallback(
    (e) => {
      e.preventDefault()
      if (searchType === 'change') return

      if (inputRef.current) {
        inputValChange(inputRef.current.value)
      }
    },
    [inputValChange, searchType]
  )
  const handleChoiceItemChecked = useCallback(
    (id: string | number, value: boolean) => {
      const foundItem = selecteds.find((item) => item.id === id)

      if (!value && foundItem) {
        setSelecteds((prev) => prev.filter((item) => item.id !== id))
        return
      }

      if (value && !foundItem) {
        const newItem = choices.find((item) => item.id === id)
        if (!newItem) return
        setSelecteds((prev) => uniqBy([...prev, newItem], 'id'))
      }
    },
    [selecteds, choices]
  )

  const handleContainertOnFocus: FocusEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setIsResultOpen(true)
  }

  const handleContainerOnBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    if (e.relatedTarget) return
    setIsResultOpen(false)
  }

  const SelectedChoicesArea = useMemo(() => {
    return filteredChoices.selectedChoices.map((item, i) => {
      if (renderSelectedChoiceItem) {
        return renderSelectedChoiceItem(item)
      }
      return (
        <div key={item.id} className={styles.resultItem} tabIndex={0}>
          <input
            type="checkbox"
            id={String(item.id)}
            name={String(item.id)}
            checked={true}
            onChange={(e) => {
              handleChoiceItemChecked(item.id, e.target.checked)
            }}
            onFocus={(e) => {
              e.stopPropagation()
              if (containerRef.current) containerRef.current.focus()
            }}
            onBlur={(e) => e.stopPropagation()}
          />
          <label htmlFor={String(item.id)} className={styles.selected}>
            {item.label}
          </label>
        </div>
      )
    })
  }, [filteredChoices, handleChoiceItemChecked, renderSelectedChoiceItem])

  const FilteredChoicesArea = useMemo(() => {
    return filteredChoices.nonSelectedChoices.map((item, i) => {
      if (renderChoiceItem) {
        return renderChoiceItem(item)
      }
      return (
        <div key={item.id} className={styles.resultItem}>
          <input
            type="checkbox"
            id={String(item.id)}
            name={String(item.id)}
            onChange={(e) => {
              handleChoiceItemChecked(item.id, e.target.checked)
            }}
            onFocus={(e) => {
              e.stopPropagation()
              if (containerRef.current) containerRef.current.focus()
            }}
            onBlur={(e) => e.stopPropagation()}
          />
          <label htmlFor={String(item.id)}>{item.label}</label>
        </div>
      )
    })
  }, [filteredChoices, handleChoiceItemChecked, renderChoiceItem])

  const FilterMessage = useMemo(() => {
    if (renderFilterMessage) {
      return renderFilterMessage(filteredChoices.searchResults, inputVal)
    }
    const resultCount = filteredChoices.searchResults.length
    const valueText = truncate(inputVal, {
      length: 20,
      omission: '...',
    })
    return (
      isResultOpen &&
      inputVal && (
        <div className={styles.filterResultText}>
          {resultCount > 0
            ? `${resultCount} item${
                resultCount > 1 ? 's' : ''
              } found for key "${valueText}"`
            : `No result found for key "${valueText}"`}
        </div>
      )
    )
  }, [inputVal, isResultOpen, renderFilterMessage, filteredChoices])

  useEffect(() => {
    if (saveToLocaleStorage) {
      localStorage.setItem('selectedItems', JSON.stringify(selecteds))
    }
    if (onSelectedsChange) {
      onSelectedsChange(selecteds)
    }
  }, [selecteds, onSelectedsChange, saveToLocaleStorage])

  return (
    <div
      className={clsx(styles.container, {
        [styles.gap]:
          isResultOpen &&
          (filteredChoices.selectedChoices.length > 0 ||
            filteredChoices.nonSelectedChoices.length > 0) &&
          !error,
      })}
      tabIndex={-1}
      ref={containerRef}
      onFocus={handleContainertOnFocus}
      onBlur={handleContainerOnBlur}
    >
      <div className={styles.inputArea}>
        <input
          type="text"
          className={clsx(styles.input, {
            [styles.noSearchIcon]: Boolean(noSearchIcon),
          })}
          onChange={handleInputChange}
          ref={inputRef}
          onKeyDown={handleInputKeydown}
        />
        {loading ? <Loading /> : searchIcon && searchIcon}

        {error ? (
          <div className={styles.errorText}>{error.message}</div>
        ) : (
          FilterMessage
        )}
      </div>

      {isResultOpen && (
        <div className={styles.resultArea}>
          {SelectedChoicesArea}
          {FilteredChoicesArea}
        </div>
      )}

      <div className={clsx(styles.button, searchButtonClasses)}>
        <button onClick={handleSearchButtonClick}>{searchButtonText}</button>
      </div>
    </div>
  )
}

export default Multiselect

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
