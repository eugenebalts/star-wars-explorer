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
  cards: [],
  status: null,
  error: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.error = null;
        state.cards = [...payload.results];
      })
      .addCase(fetchCards.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchCards.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload;
      });
  },
});

export const cardsActions = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
