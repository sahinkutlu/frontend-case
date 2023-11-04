import { createAction, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { ISearchData } from './category.entity'

export const getCategories = createAsyncThunk('category/load', async () => {
  try {
    const category: ISearchData[] = JSON.parse(localStorage.getItem('category') || '[]')
    if (category.length > 0) return category
    const response = await fetch('./items.json')
    if (!response.ok) {
      throw new Error('Veri alınamadı')
    }

    const _searchData: { data: string[] } = await response.json()

    const newSearchData = _searchData.data.map(x => ({ checked: false, label: x, id: nanoid() }))

    localStorage.setItem('category', JSON.stringify(newSearchData))

    return newSearchData
  } catch (error) {
    console.error('Veri alma hatası:', error)
  }
})

export const toggleCategory = createAction<string>('category/toggle')
export const loadCategory = createAction<ISearchData>('category/load')
export const searchCategory = createAction<string>('category/search')
export const clearSearchCategory = createAction<string | undefined>('category/clearSearch')
