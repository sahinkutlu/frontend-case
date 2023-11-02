import { PayloadAction } from '@reduxjs/toolkit'
import { SearchDataState } from './category.entity'

export default {
  'load': (state: SearchDataState) => {
    state.categories = JSON.parse(localStorage.getItem('category'))
  },
  'toggle': (state: SearchDataState, action: PayloadAction<string>) => {
    const index = state.categories.findIndex(item => item.id === action.payload)
    state.categories[index].checked = !state.categories[index].checked
    localStorage.setItem('category', JSON.stringify(state.categories))
  },
}
