import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILogin }                     from '../../types/auth'
import { RootState }                  from './index'

const initialState: ILogin = {
  access_token: '',
  user: {
    id: null,
    first_name: '',
    last_name: '',
    avatar: null,
    email: '',
    phone: '',
    is_active: 1
  },
  right: null,
  isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInformation: (state, action: PayloadAction<ILogin>) => {
      state.access_token = action.payload.access_token
      state.user = action.payload.user
      state.right = action.payload.right
    },
    clearUserInformation: (state) => {
      state.access_token = ''
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const { setUserInformation, clearUserInformation, setIsLoading } = userSlice.actions

export const userInformation = (state: RootState) => state.user

export default userSlice.reducer
