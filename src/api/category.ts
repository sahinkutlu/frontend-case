import { QueryOptions, useQuery } from '@tanstack/react-query'
import { API } from './axios'

export const useGetCategories = (opts: QueryOptions<string[]> = {}) => {
  return useQuery<string[]>({
    queryKey: ['categories'],
    async queryFn() {
      const { data } = await API.get('./items.json')
      return data.data
    },
    ...opts,
  })
}
