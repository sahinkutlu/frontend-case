import { ISearchData } from '../redux/category/category.entity'

interface ICheckBox {
  id: string
  label: string
  checked: boolean
  onClickItem: (arg: ISearchData) => void
  type: 'search' | 'list' | 'checked'
}

export default function CheckBox({ id, checked, label, onClickItem, type }: ICheckBox) {
  const handleClick = () => {
    onClickItem({ checked, id, label })
  }

  return (
    <div key={`${type}__${id}`} className='checkbox__wrapper' onClick={handleClick}>
      <div className='check'>{checked ? <div className='checked'></div> : <div className='default'></div>}</div>
      <div className='label'>{label}</div>
    </div>
  )
}
