import { useEffect } from 'react'
import MultipleSearch from './components/MultipleSearch'
import { actions } from './redux/store'
import { useDispatch } from 'react-redux'
import './App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.category.getCategories())
  }, [])

  return <MultipleSearch />
}

export default App
