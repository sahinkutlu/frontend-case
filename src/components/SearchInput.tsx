import searchSvg from '../assets/search.svg'
interface ISearchInput {
  onChange: (arg0: string) => void
}

export default function SearchInput({ onChange }: ISearchInput) {
  return (
    <div className='input__wrapper'>
      <input className='searchInput' type='text' onChange={e => onChange(e.target?.value || '')} placeholder='kategori ara...' />
      <div className='searchIcon'>
        <img src={searchSvg} />
      </div>
    </div>
  )
}
