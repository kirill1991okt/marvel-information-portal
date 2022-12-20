class MarvelServices {
  constructor() {
    this._apiBase = 'https://gateway.marvel.com:443/v1/public/';
    this._apiKey = 'apikey=d5d684a06d58da256b5a00a75e3c5ddf';
  }

  getResource = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );

    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    const transformDescription = (des) => {
      if (des) {
        return des.slice(0, 210) + '...';
      } else {
        return 'Sorry, no character data';
      }
    };

    return {
      id: char.id,
      name: char.name,
      description: transformDescription(char.description),
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelServices;
