import { createApi }           from '@reduxjs/toolkit/query/react'
import { IUser }               from '../../types/auth'
import { IUsersGroup }         from '../../types/users'
import { baseQueryWithErrors } from '../api/baseQuery'

export const usersGroupApi = createApi({
  reducerPath: 'usersGroupApi',
  baseQuery: baseQueryWithErrors,
  endpoints: (builder) => ({
    onGetUsersList: builder.query({
      query: () => ({
        url: `users`,
        method: 'POST',
        body: {}
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
    }),
    onGetUser: builder.query<{ user: IUser }, number>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'GET'
      })
    }),
    onGetUsersGroup: builder.query<IUsersGroup[], any>({
      query: () => ({
        url: `user-groups`,
        method: 'POST'
      }),
      transformResponse: (res: IUsersGroup[]) => res.map(item => {
        return {
          label: item.name,
          value: item.id.toString(),
          ...item
        }
      })
    }),
    onEditUser: builder.mutation({
      query: ({ body }) => ({
        url: `edit-user`,
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useOnGetUsersListQuery,
  useOnGetUserQuery,
  useOnGetUsersGroupQuery,
  useOnEditUserMutation
} = usersGroupApi
