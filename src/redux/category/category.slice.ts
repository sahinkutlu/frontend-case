import { createSlice } from '@reduxjs/toolkit'
import { SearchDataState } from './category.entity'
import categoryReducer from './category.reducer'
import { getCategories } from './category.action'

export const initialState: SearchDataState = {
  categories: [],
  search: [],
  isLoading: false,
  err: null,
}

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: categoryReducer,
  extraReducers: builder => {
    builder.addCase(getCategories.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false
      if (action.payload !== undefined)
      state.categories = action.payload
    })
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false
      state.err = action.error.message
    })
  },
})

export const { actions, reducer } = categorySlice
