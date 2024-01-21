import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './slices/filtersSlice';
import { cardsReducer } from './slices/cardsSlice';
import { filmsReducer } from './slices/filmsSlice';
import { characterReducer } from './slices/characterSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cards: cardsReducer,
    films: filmsReducer,
    character: characterReducer,
  },
});

export default store;
