import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCards = createAsyncThunk('cards/fetchCards', async (query, { dispatch, getState }) => {
  let currentPage = 1;
  let cards = [];
  let hasMorePages = true;

  while (hasMorePages) {
    try {
      const response = await api.getCards({ ...query, page: currentPage });

      const { results, next } = response;

      cards = [...cards, ...results];

      hasMorePages = false; // BLOCK ON 10 CARDS --TEMPORARY

      if (next) {
        currentPage += 1;
      } else {
        hasMorePages = false;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return cards;
});

const initialState = {
  default: {
    cards: [],
    cardsCount: 0,
    status: null,
    error: null,
    pages: 1,
  },
  filtered: {
    filteredCards: [],
    filteredCardsCount: 0,
    pages: 1,
  },
};

export const filterFunctions = {
  name: (cardValue, current) => cardValue.toLowerCase().startsWith(current.toLowerCase().trim()),
  gender: (cardValue, current) => {
    const lowerCardValue = cardValue.toLowerCase();
    const lowerCurrentValue = current.toLowerCase();

    if (lowerCurrentValue === '') return true;
    if (lowerCurrentValue === 'male' || lowerCurrentValue === 'female') {
      return lowerCurrentValue === lowerCardValue;
    }

    return lowerCardValue !== 'male' && lowerCardValue !== 'female';
  },
  minMass: (cardValue, current) => cardValue >= current,
  maxMass: (cardValue, current) => cardValue <= current,
  films: (cardValue, current) => {
    return [
      ...current.map((selectedFilm) => {
        return cardValue.includes(selectedFilm);
      }),
    ].every((selected) => selected);
  },
};

const filterCards = (defaultCards, filteredValues) => {
  let filteredCards = [...defaultCards];

  Object.keys(filteredValues).forEach((key) => {
    if (filteredValues[key]) {
      filteredCards = [
        ...filteredCards.filter((item) => {
          if (key === 'minMass' || key === 'maxMass') {
            if (filterFunctions[key](item.mass, filteredValues[key].value)) {
              return true;
            }
          } else if (filterFunctions[key](item[key], filteredValues[key].value)) {
            return true;
          }

          return false;
        }),
      ];
    }
  });

  return filteredCards;
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    filterCardsByGender(state, { payload }) {
      const { cards } = state.default;
      const filteredValues = payload;

      state.filtered.filteredCards = filterCards(cards, filteredValues);
    },
    filterCardsBySearch(state, { payload }) {
      const { cards } = state.default;
      const filteredValues = payload;

      state.filtered.filteredCards = filterCards(cards, filteredValues);
    },
    filterCardsByMass(state, { payload }) {
      const { cards } = state.default;
      const filteredValues = payload;

      state.filtered.filteredCards = filterCards(cards, filteredValues);
    },
    filterCardsByFilms(state, { payload }) {
      const { cards } = state.default;
      const filteredValues = payload;

      state.filtered.filteredCards = filterCards(cards, filteredValues);
    },
    updatePages(state) {
      state.filtered.pages = Math.ceil(state.filtered.filteredCards.length / 10);
    },
    setFilteredCards(state, { payload }) {
      state.filtered.filteredCards = [...payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, { payload }) => {
        state.default.status = 'resolved';
        state.default.error = null;
        state.default.cards = [...payload];
        state.default.cardsCount = payload.length;
        state.default.pages = Math.ceil(payload.length / 10);
        state.filtered.filteredCards = [...payload];
        state.filtered.filteredCardsCount = payload.length;
        state.filtered.pages = state.default.pages;
      })
      .addCase(fetchCards.pending, (state) => {
        state.default.status = 'pending';
        state.default.error = null;
      })
      .addCase(fetchCards.rejected, (state, { payload }) => {
        state.default.status = 'rejected';
        state.default.error = payload;
        state.default.cards = [];
        state.default.pages = 1;
      });
  },
});

export const cardsActions = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
