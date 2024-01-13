import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteringProps: {
    name: {
      value: '',
    },
    // films: {
    //   value: [],
    // },
    gender: {
      value: '',
    },
    minMass: {
      value: 0,
    },
    maxMass: {
      value: 200,
    },
  },
  mass: {
    value: '',
    isChanged: false,
  },
  MIN_MASS: 0,
  MAX_MASS: 200,
  minMass: {
    value: 0,
    isChanged: false,
  },
  maxMass: {
    value: 200,
    isChanged: false,
  },
  films: {
    value: [],
    isChanged: false,
  },
  page: 1,
  isChanged: false,
};

const { search, mass, minMass, maxMass, gender, films } = initialState; // default

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSearch(state, { payload }) {
      state.filteringProps.name.value = payload;
    },
    updateMass(state, { payload }) {
      state.mass.value = payload;
      state.mass.isChanged = payload.toLowerCase() !== mass.value.toLowerCase();
    },
    updateGender(state, { payload }) {
      state.filteringProps.gender.value = payload;
    },
    updateFilms(state, { payload }) {
      state.films.value = [...payload];
      state.films.isChanged = [...payload].toString() !== films.toString();
    },
    updateMinMass(state, { payload }) {
      state.filteringProps.minMass.value = payload;
    },
    updateMaxMass(state, { payload }) {
      state.filteringProps.maxMass.value = payload;
    },
    updatePage(state, { payload }) {
      if (state.page !== payload) {
        state.page = payload;
      }
    },
    resetFilters(state) {
      state.search = {
        value: search.value,
        isChanged: false,
      };

      state.mass = {
        value: mass.value,
        isChanged: false,
      };

      state.minMass = {
        value: minMass.value,
        isChanged: false,
      };

      state.maxMass = {
        value: maxMass.value,
        isChanged: false,
      };

      state.gender = {
        value: gender.value,
        isChanged: false,
      };

      state.films = {
        value: films.value,
        isChanged: false,
      };

      state.page = 1;
      state.isChanged = false;
    },
  },
});

export const filtersActions = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
