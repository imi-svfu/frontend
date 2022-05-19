import { createSlice } from '@reduxjs/toolkit';
import { createStore } from 'redux'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: null,
    loading: false,
  },
  reducers: {
    setItem: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { setItem } = dataSlice.actions;

const mode = (state = { level: 4, cameramove: true }, action) => {
  switch (action.type) {
    case 'setLevel':
      state.level = action.level
    case 'setMove':
      state.cameramove = action.cameramove
    default:
      return state
  }
}

export const auth = createStore(mode)

export default dataSlice.reducer;
