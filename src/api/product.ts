import { QueryOptions, useQuery } from '@tanstack/react-query'
import { API } from './axios'

export const getProducts = (opts: QueryOptions<string[]> = {}) => {
  return useQuery<string[]>({
    queryKey: ['products'],
    async queryFn() {
      const { data } = await API.get('assets/items.json')
      return data.data
    },
    ...opts,
  })
}
