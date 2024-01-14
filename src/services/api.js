import createSearchParams from '../utils/createSearchParams';

class Api {
  BASE_URL = 'https://swapi.dev/api/';
  PATH_TO_PEOPLE = 'people';
  PATH_TO_FILMS = 'films';
  PATH_TO_SPECIES = 'species';
  PATH_TO_STARSHIPS = 'starships';

  async GET_REQUEST(path, query = {}) {
    const endpoint = new URL(path, this.BASE_URL);
    const queryParams = createSearchParams(query);
    endpoint.search = queryParams;

    try {
      const response = await fetch(endpoint.href);

      if (!response.ok) {
        throw new Error('An error occurred');
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error';

      return Promise.reject(errorMessage);
    }
  }

  async getCards(query) {
    return this.GET_REQUEST(this.PATH_TO_PEOPLE, query);
  }

  async getFilms() {
    return this.GET_REQUEST(this.PATH_TO_FILMS);
  }

  async getFilmById(id) {
    const path = `${this.PATH_TO_FILMS}/${id}`;

    return this.GET_REQUEST(path);
  }

  async getSpeciesById(id) {
    const path = `${this.PATH_TO_SPECIES}/${id}`;

    return this.GET_REQUEST(path);
  }

  async getStarshipById(id) {
    const path = `${this.PATH_TO_STARSHIPS}/${id}`;

    return this.GET_REQUEST(path);
  }

  async getCharacter(id, query) {
    const path = `${this.PATH_TO_PEOPLE}/${id}`;
    return this.GET_REQUEST(path, query);
  }
}

export default new Api();
