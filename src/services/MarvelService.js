import { useHttp } from '../hooks/http.hook';

const useMarvelServices = () => {
  const { loading, error, request, clearError } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=d5d684a06d58da256b5a00a75e3c5ddf';
  const _offset = '210';

  const getAllCharacters = async (offset = _offset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

    return _transformComics(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);

    return _transformCharacterByName(res.data.results[0]);
  };

  const _transformCharacterByName = (char) => {
    if (char) {
      return {
        name: char.name,
        description: char.description || 'No description',
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      };
    } else {
      return {
        error: 'The character was not found.',
      };
    }
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      name: comics.title,
      description: comics.description || 'No description',
      pageCount: comics.pageCount || 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects.language || 'en-us',
      price: comics.prices[0].price,
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? char.description.slice(0, 210) + '...'
        : 'Sorry, no character data',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    getCharacterByName,
    clearError,
  };
};

export default useMarvelServices;
