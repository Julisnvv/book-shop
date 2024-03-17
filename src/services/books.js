import { newBooksEndpoint, searchBooksEndpoint, bookEndpoint } from '../utils/api.js'
import { client } from '../utils/client.js'

export const requestNewBooks = async (params) => {
  const { data } = await client.get(newBooksEndpoint, { params })
  return data
}

export const requestSearchBooks = async (params) => {
  const { search, page } = params
  const { data } = await client.get(searchBooksEndpoint + `${search}/${page}`, { params })
  return data
}

export const requestBook = async (isbn13) => {
  const { data } = await client.get(bookEndpoint + isbn13)
  return data
}
