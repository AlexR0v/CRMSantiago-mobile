import { configureStore } from '@reduxjs/toolkit'
import { loginApi }       from '../services/login'
import userReducer        from './userSlice'
import verifyReducer      from './virifySlice'

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    verify: verifyReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
