import { createSlice } from '@reduxjs/toolkit'

interface LanguageState {
  value: string
}

const initialState: LanguageState = {
  value: 'en'
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setLanguage } = languageSlice.actions
export const languageReducer = languageSlice.reducer
