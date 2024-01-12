import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCards = createAsyncThunk('cards/fetchCards', async (query, { rejectWithValue }) => {
  try {
    const response = await api.getCards(query);

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
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

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, { payload }) => {
        state.default.status = 'resolved';
        state.default.error = null;
        state.default.cards = [...payload.results];
        state.default.cardsCount = payload.count;
        state.default.pages = Math.ceil(payload.count / 10);
      })
      .addCase(fetchCards.pending, (state) => {
        state.default.status = 'pending';
        state.default.error = null;
      })
      .addCase(fetchCards.rejected, (state, { payload }) => {
        state.default.status = 'rejected';
        state.default.error = payload;
      });
  },
});

export const cardsActions = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
