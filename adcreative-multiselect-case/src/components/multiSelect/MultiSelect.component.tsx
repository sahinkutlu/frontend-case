import styles from "./MultiSelect.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MultiSelectMenu from "./MultiSelectMenu.component";
import { useEffect, useRef } from "react";
import { useMultiSelectState, useMultiSelectStateDispatch } from "./MultiSelect.context";
import { MultiSelectOption, actions } from "./MultiSelect.types";
import MultiSelectSelectedCells from "./MultiSelectSelectedCells.components";

export interface MultiSelectProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  options: MultiSelectOption[];
  loading: boolean;
  error: any;
  selectedOptions: MultiSelectOption[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<MultiSelectOption[]>>;
}

// Next iteration would be providing replacable components.
const MultiSelect = ({
  searchText,
  setSearchText,
  options,
  loading,
  error,
  selectedOptions,
  setSelectedOptions,
}: MultiSelectProps) => {
  const state = useMultiSelectState();
  const dispatch = useMultiSelectStateDispatch();

  // useEffects to listen changes and update context to avoid prop drilling
  useEffect(() => {
    dispatch({ type: actions.SET_DATA, payload: { options, loading, error } });
  }, [dispatch, options, loading, error, selectedOptions]);
  useEffect(() => {
    dispatch({ type: actions.SET_SELECTED_OPTIONS, payload: selectedOptions });
  }, [dispatch, selectedOptions]);
  useEffect(() => {
    dispatch({ type: actions.SET_SEARCH_TEXT, payload: searchText });
  }, [dispatch, searchText]);

  // Ensure menu is expanded during search
  useEffect(() => {
    if (!!searchText.length) {
      dispatch({ type: actions.EXPAND_MENU });
    }
  }, [dispatch, searchText]);

  // Handle collapse menu on click outside
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        dispatch({ type: actions.COLLAPSE_MENU });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, dispatch]);

  const controlClasses = error ? `${styles.control} ${styles.error}` : `${styles.control}`;
  return (
    <div className={controlClasses} ref={ref}>
      <div className={styles.selectionContainer}>
        <MultiSelectSelectedCells setSelectedOptions={setSelectedOptions} />
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            tabIndex={2}
            onChange={(e) => setSearchText(e.target.value)} // debounce would be good
            value={searchText}
          />
        </div>
      </div>
      <button className={styles.controlIcon} onClick={() => dispatch({ type: actions.TOGGLE_MENU })} tabIndex={3}>
        <FontAwesomeIcon fixedWidth icon={faCaretDown} />
      </button>
      {state.menuExpanded && <MultiSelectMenu setSelectedOptions={setSelectedOptions} />}
    </div>
  );
};

export default MultiSelect;