import { createApi }           from '@reduxjs/toolkit/query/react'
import { baseQueryWithErrors } from '../api/baseQuery'

export const tripSearchApi = createApi({
  reducerPath: 'tripSearchApi',
  baseQuery: baseQueryWithErrors,
  endpoints: (builder) => ({
    onGetTripsTableData: builder.query({
      query: (body) => {
        return ({
          url: `trip/search`,
          method: 'POST',
          body
        })
      }
    }),
    onGetTripDetail: builder.query({
      query: (body) => {
        return ({
          url: `trip/get`,
          method: 'POST',
          body
        })
      }
    })
  })
})

export const { useOnGetTripsTableDataQuery, useOnGetTripDetailQuery } = tripSearchApi
