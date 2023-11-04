import { useEffect } from 'react'
import MultipleSearch from './components/MultipleSearch'
import { actions, useAppSelector } from './redux/store'
import { useDispatch } from 'react-redux'
import { ISearchData } from './redux/category/category.entity'
import { clearSearchCategory, searchCategory, toggleCategory } from './redux/category/category.action'
import './App.css'

function App() {
  const dispatch = useDispatch()

  const searchData = useAppSelector(state => state.category.categories.filter(item => item.checked === false))
  const searchDataChecked = useAppSelector(state => state.category.categories.filter(item => item.checked))
  const searchedCategory = useAppSelector(state => state.category.search.filter(item => item.checked === false))

  const handleToggle = (props: ISearchData) => {
    dispatch(toggleCategory(props.id))
    dispatch(clearSearchCategory(props.id))
  }

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      dispatch(searchCategory(value))
    } else {
      dispatch(clearSearchCategory())
    }
  }
  useEffect(() => {
    dispatch(actions.category.getCategories())
  }, [])

  return (
    <MultipleSearch
      onClickItem={handleToggle}
      onSearch={handleSearch}
      searchData={searchData}
      searchDataChecked={searchDataChecked}
      searchedCategory={searchedCategory}
    />
  )
}

export default App
