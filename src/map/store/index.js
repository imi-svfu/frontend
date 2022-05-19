import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './tasks';

export default configureStore({
  reducer: {
    data: dataSlice,
    st: 'true',
  },
});
