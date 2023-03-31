import { useState, useEffect } from 'react';
import useMarvelServices from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { loading, error, getCharacter, clearError } = useMarvelServices();

  useEffect(() => {
    getChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const getChar = () => {
    clearError();
    const idChar = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(idChar).then((data) => {
      onCharLoaded(data);
    });
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;
  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={getChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = (obj) => {
  const { name, description, thumbnail, homepage, wiki } = obj.char;
  let incorrectImage = { objectFit: 'cover' };
  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    incorrectImage = { objectFit: 'contain' };
  }
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className={'randomchar__img'}
        style={incorrectImage}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
