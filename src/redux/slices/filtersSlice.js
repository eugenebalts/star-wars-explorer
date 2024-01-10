import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    isApply: false,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
  },
});

export const filtersActions = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
