import { useDispatch } from 'react-redux'
import { clearSearchCategory, toggleCategory } from '../redux/category/category.action'

interface ICheckBox {
  id: string
  label: string
  checked: boolean
  type: 'search' | 'list' | 'checked'
}

export default function CheckBox(props: ICheckBox) {
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleCategory(props.id))
    dispatch(clearSearchCategory(props.id))
  }

  return (
    <div key={`${props.type}__${props.id}`} className='checkbox__wrapper' onClick={handleToggle}>
      <div className='check'>{props.checked ? 'x' : ''}</div>
      <div className='label'>{props.label}</div>
    </div>
  )
}
