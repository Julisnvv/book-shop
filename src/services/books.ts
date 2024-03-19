import { newBooksEndpoint, searchBooksEndpoint, bookEndpoint } from '../utils/api'
import { client } from '../utils/client'
import { Book, BooksNew } from '../types/interfaces'

interface Data {
  booksData: BooksNew
}

interface SearchParams {
  search: string
  page: string
  limit: string
  offset: number
}

export const requestNewBooks = async (params: Data) => {
  const { data } = await client.get<BooksNew>(newBooksEndpoint, { params })
  return data
}

export const requestSearchBooks = async (params: SearchParams) => {
  const { search, page } = params
  const { data } = await client.get(searchBooksEndpoint + `${search}/${page}`, { params })
  return data
}

export const requestBook = async (isbn13: string) => {
  const { data } = await client.get<Book>(bookEndpoint + isbn13)
  return data
}
