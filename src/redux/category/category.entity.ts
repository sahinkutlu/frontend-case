export interface ISearchData {
  id: string
  label: string
  checked: boolean
}

export interface SearchDataState {
  categories: ISearchData[]
  isLoading: boolean
  err: any
}
