import { useAppSelector } from '../redux/store'
import Button from './Button'
import CheckBox from './CheckBox'
import SearchInput from './SearchInput'

export default function MultipleSearch() {
  const searchData = useAppSelector(state => state.category.categories.filter(item => item.checked === false))
  const searchDataChecked = useAppSelector(state => state.category.categories.filter(item => item.checked))
  const searchedCategory = useAppSelector(state => state.category.search.filter(item => item.checked === false))

  return (
    <div>
      <SearchInput />

      <div style={{ backgroundColor: 'red' }}>
        {searchedCategory.map(item => {
          return <CheckBox type='search' {...item} />
        })}
      </div>
      {searchDataChecked.map(item => {
        return <CheckBox type='checked' {...item} />
      })}
      {searchData.map(item => {
        return <CheckBox type='list' {...item} />
      })}
      <Button />
    </div>
  )
}
