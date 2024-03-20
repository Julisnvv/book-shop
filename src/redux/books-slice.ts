import { createSlice, createAsyncThunk, createAction, PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { requestNewBooks, requestSearchBooks, requestBook } from '../services/books'
import { BooksNew, Book } from '../types/interfaces'
import { FetchSearchDataOptions, BooksNewCall, BooksState } from '../types/interfacesSlice'

// Worker
export function * fetchNewDataSaga (): Generator<any, void, any> {
  try {
    const data = yield call<BooksNewCall>(requestNewBooks)
    yield put(getBooksSuccess(data))
  } catch (error: any) {
    yield put(setError(error))
  }
}

export const fetchSearchData = createAsyncThunk(
  'books/fetchSearchData',
  async (opts: FetchSearchDataOptions, { getState }: any) => {
    const { search, page = 1 } = opts
    const { limit } = getState().books
    const offset = (page - 1) * limit
    const data = await requestSearchBooks({ search, page: page.toString(), limit, offset })
    return data
  }
)

export const fetchSingleData = createAsyncThunk(
  'books/fetchSingleData',
  async (isbn13: string): Promise<Book> => {
    const data = await requestBook(isbn13)
    return data
  }
)

const initialState: BooksState = {
  newData: [],
  searchData: [],
  singleData: {} as Book,
  limit: 9,
  pagesCounter: 0,
  favoriteBooks: [],
  basketBooks: []
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooksSuccess: (state, action: PayloadAction<{ books: BooksNew[] }>) => {
      state.newData = action.payload.books.map((book) => ({
        ...book
      }))
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload
    },
    removeFavoriteBook: (state, action: PayloadAction<string>) => {
      const isbn13 = action.payload
      const updatedFavoriteBooks = state.favoriteBooks.filter((book: Book) => book.isbn13 !== isbn13)
      const favoriteStorageKey = `favoriteBook_${isbn13}`
      localStorage.removeItem(favoriteStorageKey)
      state.favoriteBooks = updatedFavoriteBooks
    },
    removeFavoriteAllBooks: (state) => {
      state.favoriteBooks = []
      const favoriteBookKeys = Object.keys(localStorage).filter(key =>
        key.startsWith('favoriteBook_')
      )
      favoriteBookKeys.forEach((key) => {
        localStorage.removeItem(key)
      })
    },
    removeBasketBook: (state, action: PayloadAction<string>) => {
      const isbn13 = action.payload
      const updatedBasketBooks = state.basketBooks.filter((book: Book) => book.isbn13 !== isbn13)
      state.basketBooks = updatedBasketBooks
      const basketStorageKey = `basketBook_${isbn13}`
      localStorage.removeItem(basketStorageKey)
    },
    removeBasketAllBooks: (state) => {
      state.basketBooks = []
      const basketBookKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith('basketBook_')
      )
      basketBookKeys.forEach((key) => {
        localStorage.removeItem(key)
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.searchData = action.payload.books.map((book: Book) => ({
          ...book
        }))
        if (state.pagesCounter) return
        state.pagesCounter = Math.ceil(action.payload.total / state.limit)
      })
      .addCase(fetchSingleData.fulfilled, (state, action) => {
        state.singleData = action.payload
      })
  }
})

// Actions
export const FETCH_NEW_DATA = 'books/fetchNewData'
export const fetchNewData = createAction(FETCH_NEW_DATA)

export const {
  getBooksSuccess,
  setError,
  removeFavoriteBook,
  removeFavoriteAllBooks,
  removeBasketBook,
  removeBasketAllBooks
} = booksSlice.actions

export const booksReducer = booksSlice.reducer
