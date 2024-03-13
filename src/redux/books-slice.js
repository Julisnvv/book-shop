import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestNewBooks, requestSearchBooks } from '../services/books'

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
    const { search, pageNumber = 1 } = opts
    const { limit } = getState().books
    const offset = (pageNumber - 1) * limit
    return await requestSearchBooks({ search, limit, offset })
    // return await requestSearchBooks({ search, page: pageNumber, limit, offset })
  }
)

const initialState = {
  newData: [],
  searchData: [],
  limit: 25,
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
        state.pagesCounter = Math.ceil(action.payload.count / state.limit)
      })
  }
})

export const booksReducer = booksSlice.reducer
