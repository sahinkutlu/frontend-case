import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

interface ISearchData {
  label: string
  checked: boolean
}

function useSearchData(): [ISearchData[], (value: ISearchData[]) => void] {
  const [searchData, setSearchData] = useLocalStorage<ISearchData[]>('searchData', [])

  const getSearchData = async () => {
    try {
      const response = await fetch('./items.json')
      if (!response.ok) {
        throw new Error('Veri alınamadı')
      }

      const _searchData: { data: string[] } = await response.json()

      const newSearchData = _searchData.data.map(x => ({ checked: false, label: x }))
      setSearchData(newSearchData)
    } catch (error) {
      console.error('Veri alma hatası:', error)
    }
  }

  useEffect(() => {
    if (searchData.length === 0) getSearchData()
  }, [])

  return [searchData, setSearchData]
}

export default useSearchData
