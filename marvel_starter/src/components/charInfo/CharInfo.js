import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMarvelServices from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

function CharInfo(props) {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelServices();

  useEffect(() => {
    updateChar();
  }, [props.selectedChar]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    if (!props.selectedChar) {
      return;
    }
    clearError();
    getCharacter(props.selectedChar).then(onCharLoaded);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(!char || loading || error) ? <View char={char} /> : null;
  return (
    <div className='char__info'>
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const comicsCutArr = comics.slice(0, 10);
  const incorrectImage = thumbnail
    .split('/')
    .includes('image_not_available.jpg');
  return (
    <>
      <div className='char__basics'>
        <img
          src={thumbnail}
          alt={name}
          style={incorrectImage ? { objectFit: 'fill' } : null}
        />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comicsCutArr.length
          ? comicsCutArr.map((item, i) => {
              const splitStr = item.resourceURI.split('/');
              return (
                <Link
                  to={`/comics/${+splitStr[splitStr.length - 1]}`}
                  className='char__comics-item'
                  key={i}
                >
                  {item.name}
                </Link>
              );
            })
          : 'There is not comics'}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  selectedChar: PropTypes.number,
};

export default CharInfo;
