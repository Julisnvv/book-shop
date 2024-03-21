import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { takeEvery } from 'redux-saga/effects'
import { languageReducer } from './language-slice'
import { booksReducer, FETCH_NEW_DATA, fetchNewDataSaga } from './books-slice'
import { imagePreviewReducer } from './image-preview-slice'

// Watcher
function * sagas () {
  yield takeEvery(FETCH_NEW_DATA, fetchNewDataSaga)
}

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

export const store = configureStore({
  reducer: {
    language: languageReducer,
    books: booksReducer,
    imagePreview: imagePreviewReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
})

// Run all sagas
sagaMiddleware.run(sagas)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
