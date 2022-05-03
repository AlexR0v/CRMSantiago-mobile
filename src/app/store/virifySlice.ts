import { createSlice } from '@reduxjs/toolkit'
import { RootState }   from './index'

const initialState = {
  user_id: null,
  phone: null
}

export const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    setUserVerifyInformation: (state, action) => {
      state.user_id = action.payload.user_id
      state.phone = action.payload.phone
    }
  }
})

export const { setUserVerifyInformation } = verifySlice.actions

export const userVerifyInformation = (state: RootState) => state.verify

export default verifySlice.reducer
