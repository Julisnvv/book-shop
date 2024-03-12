import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestNewBooks } from '../services/books'

export const fetchNewData = createAsyncThunk(
  'books/fetchNewData',
  async () => {
    const data = await requestNewBooks()
    return data
  }
)

const initialState = {
  newData: []
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
  }
})

export const booksReducer = booksSlice.reducer
