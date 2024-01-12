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
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    filterCardsByGender(state, { payload }) {
      const defaultCards = state.default.cards;
      const currentCards = state.filtered.filteredCards;

      const filteredGender = defaultCards.filter(
        (defCard) => !currentCards.some((curCard) => curCard.name === defCard.name)
      );

      state.filtered.filteredCards.push(...filteredGender);

      state.filtered.filteredCards = state.filtered.filteredCards.filter((card) => {
        if (payload.value === '') return true;

        if (payload.value === 'male' || payload.value === 'female') {
          return card.gender === payload.value;
        }

        return card.gender !== 'male' && card.gender !== 'female';
      });
    },
    filterCardsBySearch(state, { payload }) {
      const { cards } = state.default;
      const filteredValues = payload; // {name: '...'}
      console.log(filteredValues);

      Object.keys(filteredValues).forEach((key) => {
        if (!filteredValues[key]) return;

        state.filtered.filteredCards = cards.filter((item) => {
          if (filterFunctions[key](item[key], payload.name.value)) return true;

          return false;
        });
      });
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
