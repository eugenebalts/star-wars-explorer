import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  mass: '',
  MIN_MASS: 0,
  MAX_MASS: 100,
  gender: '',
  films: [],
  page: 1,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSearch(state, { payload }) {
      state.search = payload;
    },
    updateMass(state, { payload }) {
      state.mass = payload;
    },
    updateGender(state, { payload }) {
      state.gender = payload;
    },
    updateFilms(state, { payload }) {
      state.films = [...payload];
    },
    updatePage(state, { payload }) {
      state.page = payload;
    },
    resetFilters(state) {
      state.search = '';
      state.mass = '';
      state.MIN_MASS = 0;
      state.MAX_MASS = 100;
      state.mass = '';
      state.gender = '';
      state.films = [];
    },
  },
});

export const filtersActions = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
