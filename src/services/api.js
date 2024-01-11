import createSearchParams from '../utils/createSearchParams';

class Api {
  BASE_URL = 'https://swapi.dev/api/';

  async GET_REQUEST(path, query = {}) {
    const endpoint = new URL(`${path}`, this.BASE_URL);
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
    const path = 'people';

    return this.GET_REQUEST(path, query);
  }

  async getFilms() {
    const path = 'films';

    return this.GET_REQUEST(path);
  }
}

export default new Api();
