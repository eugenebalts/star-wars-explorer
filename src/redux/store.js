import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './slices/filtersSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});

export default store;