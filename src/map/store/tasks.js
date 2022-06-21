import { createSlice } from '@reduxjs/toolkit';
import { createStore } from 'redux'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: null,
    result: null,
    level: 0, 
    move: true,
    loading: false,
    schedule: {},
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
    setSchedule: (state, action) => {
      const buff = {}
      action.payload.map(item => {
        if (buff[item.room.num]) {
          buff[item.room.num].push(item)
        } else {
          buff[item.room.num] = [ item ]
        }
      })
      state.schedule = buff
    },
  },
});

export const { setItem, setMove, setLevel, setSchedule } = dataSlice.actions;

export default dataSlice.reducer;
