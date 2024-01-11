class Api {
  BASE_URL = 'https://swapi.dev/api/';

  async getCards(query) {
    const path = 'people';
    const endpoint = new URL(`${path}`, this.BASE_URL);
    const queryParams = new URLSearchParams(query);
    endpoint.search = queryParams;

    try {
      const response = await fetch(endpoint.href);

      return await response.json();
    } catch (err) {
      console.error(err);

      return null;
    }
  }
}

export default new Api();
