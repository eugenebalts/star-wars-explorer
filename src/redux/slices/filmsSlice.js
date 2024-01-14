import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchFilms = createAsyncThunk('cards/fetchFilms', async (query, { rejectWithValue }) => {
  try {
    const response = await api.getFilms();

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  films: [],
  status: null,
  error: null,
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.error = null;
        state.films = [...payload.results];
      })
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchFilms.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload;
      });
  },
});

export const filmsActions = filmsSlice.actions;
export const filmsReducer = filmsSlice.reducer;
