import { configureStore } from '@reduxjs/toolkit'
import { languageReducer } from './language-slice'
import { booksReducer } from './books-slice'
import { imagePreviewReducer } from './image-preview-slice'

export const store = configureStore({
  reducer: {
    language: languageReducer,
    books: booksReducer,
    imagePreview: imagePreviewReducer
  }
})
