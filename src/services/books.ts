import { newBooksEndpoint, searchBooksEndpoint, bookEndpoint } from '../utils/api.ts'
import { client } from '../utils/client.ts'

type RequestsParams = {
  search?: string
  page?: number
}

export const requestNewBooks = async (params: RequestsParams) => {
  const { data } = await client.get(newBooksEndpoint, { params })
  return data
}

export const requestSearchBooks = async (params: RequestsParams) => {
  const { search, page } = params
  const { data } = await client.get(searchBooksEndpoint + `${search}/${page}`, { params })
  return data
}

export const requestBook = async (isbn13: string) => {
  const { data } = await client.get(bookEndpoint + isbn13)
  return data
}
