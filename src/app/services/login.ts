import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https:/dev.waysops.com/api/v1/' }),
  endpoints: (builder) => ({
    onLogin: builder.mutation({
      query: ({ body }) => ({
        url: `login`,
        method: 'POST',
        body
      })
    }),
    onVerify: builder.mutation({
      query: ({ body }) => ({
        url: `verify`,
        method: 'POST',
        body
      })
    }),
    onChangePass: builder.mutation({
      query: ({ body }) => ({
        url: `forgot-password`,
        method: 'POST',
        body
      })
    })
  })
})

export const { useOnLoginMutation, useOnVerifyMutation, useOnChangePassMutation } = loginApi
