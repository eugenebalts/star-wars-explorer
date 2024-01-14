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

      if (currentPage === 3) hasMorePages = false; // BLOCK ON 20 CARDS --TEMPORARY

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
  },
  filtered: {
    filteredCards: [],
    filteredCardsCount: 0,
    pages: 1,
    currentPage: 1,
  },
};

export const filterFunctions = {
  name: (cardValue, current) => cardValue.toLowerCase().trim().startsWith(current.toLowerCase().trim()),
  gender: (cardValue, current) => {
    const lowerCardValue = cardValue.toLowerCase();
    const lowerCurrentValue = current.toLowerCase();

    if (lowerCurrentValue === '') return true;
    if (lowerCurrentValue === 'male' || lowerCurrentValue === 'female') {
      return lowerCurrentValue === lowerCardValue;
    }

    return lowerCardValue !== 'male' && lowerCardValue !== 'female';
  },
  minMass: (cardValue, current) => {
    if (cardValue === 'unknown') return true;

    return cardValue.replace(',', '.') >= current;
  },
  maxMass: (cardValue, current) => {
    if (cardValue === 'unknown') return true;

    return cardValue.replace(',', '.') <= current;
  },
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
    filterCards(state, { payload }) {
      const { cards } = state.default;
      const filteredValues = payload;

      state.filtered.currentPage = 1;
      state.filtered.filteredCards = filterCards(cards, filteredValues);
      state.filtered.filteredCardsCount = state.filtered.filteredCards.length;
      state.filtered.pages = Math.ceil(state.filtered.filteredCards.length / 10);
    },
    updateCurrentPage(state, { payload }) {
      state.filtered.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, { payload }) => {
        state.default.status = 'resolved';
        state.default.error = null;
        state.default.cards = [...payload];
        state.default.cardsCount = payload.length;
        state.filtered.filteredCards = [...payload];
        state.filtered.filteredCardsCount = payload.length;
        state.filtered.pages = Math.ceil(state.filtered.filteredCards.length / 10);
      })
      .addCase(fetchCards.pending, (state) => {
        state.default.status = 'pending';
        state.default.error = null;
      })
      .addCase(fetchCards.rejected, (state, { payload }) => {
        state.default.status = 'rejected';
        state.default.error = payload;
        state.default.cards = [];
      });
  },
});

export const cardsActions = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
