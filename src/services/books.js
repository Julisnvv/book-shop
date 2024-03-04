import { booksEndpoint } from '../api.js'
import { client } from '../utils/client.js'

export const requestBooks = async (params) => {
  const { data } = await client.get(booksEndpoint, { params })
  return data
}
