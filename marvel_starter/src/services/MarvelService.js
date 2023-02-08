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
    console.log(res);
    return res.data.results.map(_transformComics);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      name: comics.title,
      price: comics.prices[0].price,
    };
  };

  const _transformCharacter = (char) => {
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

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getAllComics,
    clearError,
  };
};

export default useMarvelServices;
