import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  mass: '',
  MIN_MASS: 0,
  MAX_MASS: 100,
  minMass: 0,
  maxMass: 100,
  gender: '',
  films: [],
  page: 1,
  isChanged: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSearch(state, { payload }) {
      if (state.search !== payload) {
        state.search = payload;
        state.isChanged = true;
      }
    },
    updateMass(state, { payload }) {
      if (state.mass !== payload) {
        state.mass = payload;
        state.isChanged = true;
      }
    },
    updateGender(state, { payload }) {
      if (state.gender !== payload) {
        state.gender = payload;
        state.isChanged = true;
      }
    },
    updateFilms(state, { payload }) {
      if (state.films.toString() !== payload.toString()) {
        state.films = [...payload];
        state.isChanged = true;
      }
    },
    updatePage(state, { payload }) {
      if (state.page !== payload) {
        state.page = payload;
      }
    },
    updateMinMass(state, { payload }) {
      if (state.minMass !== payload) {
        state.minMass = payload;
        state.isChanged = true;
      }
    },
    updateMaxMass(state, { payload }) {
      if (state.maxMass !== payload) {
        state.maxMass = payload;
        state.isChanged = true;
      }
    },
    resetFilters(state) {
      state.search = '';
      state.mass = '';
      state.minMass = state.MIN_MASS;
      state.maxMass = state.MAX_MASS;
      state.mass = '';
      state.gender = '';
      state.films = [];
      state.isChanged = false;
    },
  },
});

export const filtersActions = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
