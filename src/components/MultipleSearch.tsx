import { useAppSelector } from '../redux/store'
import Button from './Button'
import CheckBox from './CheckBox'
import SearchInput from './SearchInput'

export default function MultipleSearch() {
  const searchData = useAppSelector(state => state.category.categories.filter(item => item.checked === false))
  const searchDataChecked = useAppSelector(state => state.category.categories.filter(item => item.checked))
  return (
    <div>
      <SearchInput />
      {searchDataChecked.map(item => {
        return <CheckBox {...item} />
      })}
      {searchData.map(item => {
        return <CheckBox {...item} />
      })}
      <Button />
    </div>
  )
}
