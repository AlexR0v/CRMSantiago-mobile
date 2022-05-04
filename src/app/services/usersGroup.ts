import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser }                     from '../../types/auth'

export const usersGroupApi = createApi({
  reducerPath: 'usersGroupApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://waysops.com/api/v1/' }),
  endpoints: (builder) => ({
    onGetUsersList: builder.query({
      query: (token) => ({
        url: `users`,
        method: 'POST',
        body: {},
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }),
      transformResponse: (res: IUser[]) => res.sort(function (a: any, b: any){
        if (a.first_name < b.first_name) { return -1 }
        if (a.first_name > b.first_name) { return 1 }
        if (a.first_name === b.first_name) {
          if (a.last_name < b.last_name) { return -1 }
          if (a.last_name > b.last_name) { return 1 }
        }
        return 0
      })
    })
  })
})

export const { useOnGetUsersListQuery } = usersGroupApi
