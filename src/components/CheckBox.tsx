import { useDispatch } from 'react-redux'
import { toggleCategory } from '../redux/category/category.action'

interface ICheckBox {
  id: string
  label: string
  checked: boolean
}

export default function CheckBox(props: ICheckBox) {
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleCategory(props.id))
  }
  return (
    <div key={props.id} className='checkbox__wrapper' onClick={handleToggle}>
      <div className='check'>{props.checked ? 'x' : ''}</div>
      <div className='label'>{props.label}</div>
    </div>
  )
}
