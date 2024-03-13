import { newBooksEndpoint, searchBooksEndpoint } from '../api.js'
import { client } from '../utils/client.js'

export const requestNewBooks = async (params) => {
  const { data } = await client.get(newBooksEndpoint, { params })
  return data
}

export const requestSearchBooks = async (params) => {
  const { data } = await client.get(searchBooksEndpoint + params.search, { params })
  return data
}
