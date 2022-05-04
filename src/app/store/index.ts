import { configureStore } from '@reduxjs/toolkit'
import { loginApi }       from '../services/login'
import { usersGroupApi }  from '../services/usersGroup'
import userReducer        from './userSlice'
import verifyReducer      from './virifySlice'

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [usersGroupApi.reducerPath]: usersGroupApi.reducer,
    verify: verifyReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, usersGroupApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
