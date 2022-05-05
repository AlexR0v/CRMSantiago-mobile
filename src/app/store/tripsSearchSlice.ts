import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState }                  from './index'

const initialState = {
  search: null,
  trip_name: {
    value: [],
    filter_type: 'text',
    option_type: 'contains'
  },
  invoice_number: {
    value: [],
    filter_type: 'text',
    option_type: 'contains'
  },
  invoice_date: {
    value: [],
    value_type: 'day',
    filter_type: 'date',
    option_type: 'in_the_last'
  },
  cost: {
    value: [],
    filter_type: 'numeric',
    option_type: 'between'
  },
  insurance_cost: {
    value: [],
    filter_type: 'numeric',
    option_type: 'between'
  },
  customer_name: {
    value: [],
    filter_type: 'text',
    option_type: 'contains'
  },
  operations_owner_id: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  created_date: {
    value: [],
    value_type: 'day',
    filter_type: 'date',
    option_type: 'in_the_last'
  },
  created_user_id: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  start_date: {
    value: [],
    value_type: 'day',
    filter_type: 'date',
    option_type: 'in_the_last'
  },
  end_date: {
    value: [],
    value_type: 'day',
    filter_type: 'date',
    option_type: 'in_the_last'
  },
  business_trip_price: {
    value: [],
    filter_type: 'numeric',
    option_type: 'between' // can be "between", "less_than", "equal_to", "greater_than"
  },
  business_cost_margin_per: {
    value: [],
    filter_type: 'percentage',
    option_type: 'between'
  },
  travellers: {
    value: [],
    filter_type: 'numeric',
    option_type: 'between'
  },
  active_trips: {
    value: [],
    value_type: 'day',
    filter_type: 'date',
    option_type: 'due_in'
  },
  start_location: {
    value: [],
    filter_type: 'text',
    option_type: 'contains'
  },
  end_location: {
    value: [],
    filter_type: 'text',
    option_type: 'contains'
  },
  general_status_id: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  accommodation_status_id: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  luggage_status_id: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  normal_status_id: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  other_status_id: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  voucher_status_id: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  insurance_status_id: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  is_pending_tasks: false,
  is_overdue_tasks: false,
  tags: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  is_pending_prepayments: false,
  trip_type_id: {
    value: [],
    filter_type: 'autocomplete',
    option_type: 'is'
  },
  order_by: null,
  order_type: null,
  page: 1,
  count: 10,
  search_hash: null
}

export const tripsSearchSlice = createSlice({
  name: 'tripsSearch',
  initialState,
  reducers: {
    setTripPage: (state, action) => {
      state.page = action.payload
    },
    setTripSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    }
  }
})

export const { setTripPage, setTripSearch } = tripsSearchSlice.actions

export const tripSearchStore = (state: RootState) => state.tripsSearch

export default tripsSearchSlice.reducer
