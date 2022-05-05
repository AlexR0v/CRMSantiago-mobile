import { configureStore } from '@reduxjs/toolkit'
import { loginApi }       from '../services/login'
import { tripSearchApi }  from '../services/tripSearch'
import { usersGroupApi }  from '../services/usersGroup'
import notifySlice        from './notifySlice'
import userReducer        from './userSlice'
import verifyReducer      from './virifySlice'

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [usersGroupApi.reducerPath]: usersGroupApi.reducer,
    [tripSearchApi.reducerPath]: tripSearchApi.reducer,
    verify: verifyReducer,
    user: userReducer,
    notify: notifySlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      usersGroupApi.middleware,
      tripSearchApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
