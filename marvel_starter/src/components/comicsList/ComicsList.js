import { useState, useEffect } from 'react';
import useMarvelServices from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';
import avengers from '../../resources/img/Avengers.png';
import logo from '../../resources/img/Avengers_logo.png';

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [itemLoaded, setItemLoaded] = useState(false);

  const { loading, error, getAllComics } = useMarvelServices();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onAllComicsLoaded);
  };

  const onAllComicsLoaded = (comicsData) => {
    let loaded = false;
    if (comicsData.length < 8) {
      loaded = true;
    }
    setComics((comics) => [...comics, ...comicsData]);
    setOffset((offset) => offset + 8);
    setNewItemLoading(false);
    setItemLoaded(loaded);
  };

  const comicsItems = (dataComics) => {
    const elements = dataComics.map(({ id, thumbnail, name, price }) => {
      return (
        <li className='comics__item' key={id}>
          <a href='#'>
            <img
              src={thumbnail}
              alt='ultimate war'
              className='comics__item-img'
            />
            <div className='comics__item-name'>{name}</div>
            <div className='comics__item-price'>{price}$</div>
          </a>
        </li>
      );
    });

    return <ul className='comics__grid'>{elements}</ul>;
  };

  const listItems = comicsItems(comics);
  const sniper = loading && !newItemLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className='comics__main'>
      <div className='comics__banner'>
        <img src={avengers} alt='avengers' className='comics__banner-img' />
        <p className='comics__banner-text'>
          New comics every week! <br /> Stay tuned!
        </p>
        <img src={logo} alt='logo' className='comics__banner-logo' />
      </div>
      <div className='comics__list'>
        {sniper}
        {errorMessage}
        {listItems}
        <button
          className='button button__main button__long'
          disabled={newItemLoading}
          onClick={() => onRequest(offset)}
          style={{ display: itemLoaded ? 'none' : 'block' }}
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    </div>
  );
};

export default ComicsList;
