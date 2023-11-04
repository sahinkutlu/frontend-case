export interface ISearchData {
  id: string
  label: string
  checked: boolean
}

export interface SearchDataState {
  categories: ISearchData[]
  search: ISearchData[]
  isLoading: boolean
  err: any
}
