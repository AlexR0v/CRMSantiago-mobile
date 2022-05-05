import AsyncStorage                               from '@react-native-async-storage/async-storage'
import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { FetchBaseQueryError }                    from '@reduxjs/toolkit/query'
import { Alert }                                  from 'react-native'
import { RootState }                              from '../store/index'
import { clearUserInformation, setIsLoading }     from '../store/userSlice'

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://dev.waysops.com/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const { user: { access_token } } = getState() as RootState
    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`)
      headers.set('Accept', `application/json`)
    }
    return headers
  }
})

export const baseQueryWithErrors: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await customBaseQuery(args, api, extraOptions)
  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    api.dispatch(setIsLoading(true))
    api.dispatch(clearUserInformation())
    await AsyncStorage.clear()
    api.dispatch(setIsLoading(false))
    Alert.alert('Error', 'Authorization')
  }
  return result
}
