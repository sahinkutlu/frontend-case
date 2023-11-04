import { PayloadAction } from '@reduxjs/toolkit'
import { SearchDataState } from './category.entity'

export default {
  'load': (state: SearchDataState) => {
    state.categories = JSON.parse(localStorage.getItem('category') || '[]')
  },
  'toggle': (state: SearchDataState, action: PayloadAction<string>) => {
    const index = state.categories.findIndex(item => item.id === action.payload)
    state.categories[index].checked = !state.categories[index].checked
    localStorage.setItem('category', JSON.stringify(state.categories))
  },
  'search': (state: SearchDataState, action: PayloadAction<string>) => {
    const results = []
    const searchLower = action.payload.toLowerCase()

    for (let i = 0; i < state.categories.length; i++) {
      const element = state.categories[i]

      const label = element.label.toLowerCase()

      if (label.includes(searchLower)) {
        results.push(element)
      }
    }

    state.search = results
  },
  'clearSearch': (state: SearchDataState, action: PayloadAction<string>) => {
    if (typeof action.payload === 'string' && action.payload !== '') {
      state.search = state.search
        .map(item => {
          if (item.id !== action.payload) return item
        })
        .filter(item => item)
    } else {
      state.search = []
    }
  },
}
