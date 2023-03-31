import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelServices from '../../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';

import './singleNamePage.scss';

const SingleComicPage = () => {
  const { charName } = useParams();

  const [char, setChar] = useState(null);

  const {
    loading,
    error,
    getCharacterByName,
    clearError,
  } = useMarvelServices();

  useEffect(() => {
    onUpdateChar();
  }, [charName]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const onUpdateChar = () => {
    clearError();
    getCharacterByName(charName).then(onCharLoaded);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(!char || loading || error) ? <View char={char} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ char }) => {
  const { name, thumbnail, description } = char;

  return (
    <div className="single-char">
      <img src={thumbnail} alt={name} className="single-char__img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr">{description}</p>
      </div>
      <Link to={'/'} className="single-char__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
