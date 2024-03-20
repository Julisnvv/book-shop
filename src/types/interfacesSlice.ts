import { Book, BooksNew } from './interfaces'

export interface Data {
  booksData: BooksNew
}

export interface SearchParams {
  search: string
  page: string
  limit: string
  offset: number
}

export interface ImagePreviewState {
  url: string
}

export interface LanguageState {
  value: string
}

export interface FetchSearchDataOptions {
  search: string
  page?: number
}

export type BooksNewCall = (...args: any) => any

export interface BooksState {
  newData: BooksNew[]
  searchData: BooksNew[]
  singleData: Book
  limit: number
  pagesCounter: number
  favoriteBooks: Book[]
  basketBooks: Book[]
  error?: any
}
