import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestBooks } from '../services/books'

export const fetchData = createAsyncThunk(
  'books/fetchData',
  async () => {
    const data = await requestBooks()
    return data
  }
)

const initialState = {
  data: []
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.books.map((book) => ({
          ...book
        }))
      })
  }
})

export const booksReducer = booksSlice.reducer
