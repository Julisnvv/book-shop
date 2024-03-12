import { newBooksEndpoint } from '../api.js'
import { client } from '../utils/client.js'

export const requestNewBooks = async (params) => {
  const { data } = await client.get(newBooksEndpoint, { params })
  return data
}
