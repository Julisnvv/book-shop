import { createSlice } from '@reduxjs/toolkit'

interface ImagePreviewState {
  url: string
}

const initialState: ImagePreviewState = {
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
