import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteringProps: {
    name: {
      value: '',
      isChanged: false,
    },
    films: {
      value: [],
      isChanged: false,
    },
    gender: {
      value: '',
      isChanged: false,
    },
    minMass: {
      value: 0,
      isChanged: false,
    },
    maxMass: {
      value: 200,
      isChanged: false,
    },
  },
  MIN_MASS: 0,
  MAX_MASS: 200,
  page: 1,
  isChanged: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSearch(state, { payload }) {
      state.filteringProps.name.value = payload;
      state.filteringProps.name.isChanged = !!payload.length;
    },
    updateGender(state, { payload }) {
      state.filteringProps.gender.value = payload;
      state.filteringProps.gender.isChanged = !!payload.length;
    },
    updateFilms(state, { payload }) {
      state.filteringProps.films.value = [...payload];
      state.filteringProps.films.isChanged = !!state.filteringProps.films.value.length;
    },
    updateMinMass(state, { payload }) {
      state.filteringProps.minMass.value = payload;
      state.filteringProps.minMass.isChanged = payload !== state.MIN_MASS;
    },
    updateMaxMass(state, { payload }) {
      state.filteringProps.maxMass.value = payload;
      state.filteringProps.maxMass.isChanged = payload !== state.MAX_MASS;
    },
    updatePage(state, { payload }) {
      if (state.page !== payload) {
        state.page = payload;
      }
    },
    updateMASS(state, { payload }) {
      const cards = payload;

      if (cards.length) {
        const sortedMass = cards
          .map((card) => {
            if (card.mass === 'unknown') {
              return 0;
            }

            return Number(card.mass.replace(',', '.'));
          })
          .sort((a, b) => a - b);

        state.MIN_MASS = sortedMass[0];
        state.MAX_MASS = sortedMass[sortedMass.length - 1];
      }
    },
    updateIsChanged(state, { payload }) {
      const filteringProps = payload;

      state.isChanged = [
        ...Object.keys(filteringProps).map((key) => {
          return filteringProps[key].isChanged;
        }),
      ].every((prop) => !prop);
    },
    resetFilters(state) {
      state.filteringProps.name.value = '';
      state.filteringProps.gender.value = '';
      state.filteringProps.films.value = [];
      state.filteringProps.minMass.value = state.MIN_MASS;
      state.filteringProps.maxMass.value = state.MAX_MASS;

      Object.keys(state.filteringProps).forEach((prop) => {
        state.filteringProps[prop].isChanged = false;
      });
    },
  },
});

export const filtersActions = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
