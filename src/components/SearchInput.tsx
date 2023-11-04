import { useDispatch } from 'react-redux'
import { clearSearchCategory, searchCategory } from '../redux/category/category.action'

export default function SearchInput() {
  const dispatch = useDispatch()

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      dispatch(searchCategory(value))
    } else {
      dispatch(clearSearchCategory())
    }
  }

  return (
    <div>
      <input type='text' onChange={e => handleSearch(e.target?.value || '')} placeholder='Search...' />
    </div>
  )
}
