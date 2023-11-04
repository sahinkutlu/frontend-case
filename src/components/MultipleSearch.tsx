import { ISearchData } from '../redux/category/category.entity'
import Button from './Button'
import CheckBox from './CheckBox'
import SearchInput from './SearchInput'

interface IMultipeSearch {
  searchData: ISearchData[]
  searchDataChecked: ISearchData[]
  searchedCategory: ISearchData[]
  onSearch: (arg: string) => void
  onClickItem: (arg: ISearchData) => void
}

export default function MultipleSearch({
  searchData,
  searchDataChecked,
  searchedCategory,
  onClickItem,
  onSearch,
}: IMultipeSearch) {
  return (
    <div className='multiplesearch__wrapper'>
      <h3>Kategoriler</h3>
      <SearchInput onChange={onSearch} />

      <div className='list__container'>
        {searchDataChecked.length > 0 ? (
          <div className='list'>
            {searchDataChecked.map(item => {
              return <CheckBox onClickItem={onClickItem} type='checked' {...item} />
            })}
          </div>
        ) : null}

        {searchedCategory.length > 0 ? (
          <div className='list'>
            {searchedCategory.map(item => {
              return <CheckBox onClickItem={onClickItem} type='search' {...item} />
            })}
          </div>
        ) : null}

        {searchedCategory.length === 0 && searchData.length > 0 ? (
          <div className='list'>
            {searchData.map(item => {
              return <CheckBox onClickItem={onClickItem} type='list' {...item} />
            })}
          </div>
        ) : null}
      </div>
      <Button />
    </div>
  )
}
