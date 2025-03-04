// store/slices/counter.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  token:1234567
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      console.log(state);
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.token = action.payload.token
    },
    reset: (state) => {
      state.value = 0,
      state.token = 1234567
    }
  }
})

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer