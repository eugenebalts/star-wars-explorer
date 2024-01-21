import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';
import getIdFromUrl from '../../utils/getIdFromUrl';

export const fetchCharacter = createAsyncThunk('character/fetchCharacter', async (id) => {
  try {
    const response = await api.getCharacter(id);

    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const fetchSpecies = createAsyncThunk('character/fetchSpecies', async (species) => {
  const speciesNames = [];

  await Promise.allSettled(
    species.map(async (url) => {
      const speciesId = getIdFromUrl(url, 'species')[0];

      try {
        const response = await api.getSpeciesById(speciesId);

        speciesNames.push(response.name);
      } catch (err) {
        console.error(`Cannot fetch species for id ${speciesId} with error: ${err}`);
      }
    })
  );

  return speciesNames;
});

export const fetchStarships = createAsyncThunk('character/fetchStarshils', async (starships) => {
  const starshipsNames = [];

  await Promise.all(
    starships.map(async (url) => {
      const starshipId = getIdFromUrl(url, 'starships')[0];

      try {
        const response = await api.getStarshipById(starshipId);

        starshipsNames.push(response.model);
      } catch (err) {
        console.error(`Cannot fetch starships for id ${starshipId} with error: ${err}`);
      }
    })
  );

  return starshipsNames;
});

export const fetchFilms = createAsyncThunk('character/fetchFilms', async (films) => {
  const filmsNames = [];

  await Promise.all(
    films.map(async (url) => {
      const filmId = getIdFromUrl(url, 'films')[0];

      try {
        const response = await api.getFilmById(filmId);

        filmsNames.push(response.title);
      } catch (err) {
        console.error(`Cannot fetch films for id ${filmId} with error: ${err}`);
      }
    })
  );

  return filmsNames;
});

const initialState = {
  characterData: {},
  species: [],
  starships: [],
  films: [],
  status: null,
  error: null,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    resetCharacter(state) {
      state.characterData = {};
      state.species = [];
      state.starships = [];
      state.films = [];
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacter.fulfilled, (state, { payload }) => {
      state.characterData = payload;
      state.status = 'fulfilled ';
    });
    builder.addCase(fetchCharacter.rejected, (state) => {
      state.error = true;
      state.status = 'rejected ';
    });
    builder.addCase(fetchSpecies.fulfilled, (state, { payload }) => {
      state.species = payload;
    });
    builder.addCase(fetchStarships.fulfilled, (state, { payload }) => {
      state.starships = payload;
    });
    builder.addCase(fetchFilms.fulfilled, (state, { payload }) => {
      state.films = payload;
    });
  },
});

export const characterActions = characterSlice.actions;
export const characterReducer = characterSlice.reducer;
