import { createSlice } from '@reduxjs/toolkit'
import { RootState }   from './index'

const initialState = {
  visible: false,
  message: ''
}

export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setIsNotifyVisible: (state, action) => {
      state.visible = action.payload.visible
      state.message = action.payload.message
    }
  }
})

export const { setIsNotifyVisible } = notifySlice.actions

export const isNotifyVisible = (state: RootState) => state.notify

export default notifySlice.reducer
