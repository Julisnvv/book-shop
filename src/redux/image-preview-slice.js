import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  url: ''
}

export const imagePreviewSlice = createSlice({
  name: 'imagePreview',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.url = action.payload
    }
  }
})

export const { setImage } = imagePreviewSlice.actions
export const imagePreviewReducer = imagePreviewSlice.reducer
