import { createSlice } from '@reduxjs/toolkit';
import { createStore } from 'redux'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: null,
    result: null,
    level: 4, 
    move: true,
    loading: false,
  },
  reducers: {
    setItem: (state, action) => {
      state.result = action.payload
    },
    setMove: (state, action) => {
      state.move = action.payload
    },
    setLevel: (state, action) => {
      state.level = action.payload
    },
  },
});

export const { setItem, setMove, setLevel } = dataSlice.actions;

export default dataSlice.reducer;
