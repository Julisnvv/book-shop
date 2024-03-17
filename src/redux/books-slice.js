import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestNewBooks, requestSearchBooks, requestBook } from '../services/books'

export const fetchNewData = createAsyncThunk(
  'books/fetchNewData',
  async () => {
    const data = await requestNewBooks()
    return data
  }
)

export const fetchSearchData = createAsyncThunk(
  'books/fetchSearchData',
  async (opts = {}, { getState }) => {
    const { search, page = 1 } = opts
    const { limit } = getState().books
    const offset = (page - 1) * limit
    const data = await requestSearchBooks({ search, page, limit, offset })
    return data
  }
)

export const fetchSingleData = createAsyncThunk(
  'books/fetchSingleData',
  async (isbn13) => {
    const data = await requestBook(isbn13)
    return data
  }
)

const initialState = {
  newData: [],
  searchData: [],
  singleData: {},
  limit: 9,
  pagesCounter: 0
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewData.fulfilled, (state, action) => {
        state.newData = action.payload.books.map((book) => ({
          ...book
        }))
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.searchData = action.payload.books.map((book) => ({
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

export const booksReducer = booksSlice.reducer
