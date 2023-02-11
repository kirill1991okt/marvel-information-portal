import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMarvelServices from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

function CharList(props) {
  const [dataChar, setDataChar] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [itemLoaded, setItemLoaded] = useState(false);

  const itemRefs = useRef([]);

  const { loading, error, getAllCharacters } = useMarvelServices();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onAllCharLoaded);
  };

  const onAllCharLoaded = (newDataChar) => {
    let loaded = false;
    if (newDataChar.length < 9) {
      loaded = true;
    }
    setDataChar((dataChar) => [...dataChar, ...newDataChar]);
    setOffset((offset) => offset + 9);
    setNewItemLoading(false);
    setItemLoaded(loaded);
  };

  const addClass = (i) => {
    itemRefs.current.forEach((item) => {
      item.classList.remove('char__item_selected');
    });
    itemRefs.current[i].classList.add('char__item_selected');
    itemRefs.current[i].focus();
  };

  const charItems = (arrList) => {
    const elements = arrList.map(({ thumbnail, name, id }, i) => {
      return (
        <li
          ref={(el) => (itemRefs.current[i] = el)}
          tabIndex={0}
          className="char__item"
          key={id}
          onClick={() => {
            addClass(i);
            props.updateIdChar(id);
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              addClass(i);
              props.updateIdChar(id);
            }
          }}
        >
          <img src={thumbnail} alt="abyss" />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{elements}</ul>;
  };

  const listItem = charItems(dataChar);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {listItem}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        style={{ display: itemLoaded ? 'none' : 'block' }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

CharList.propTypes = {
  updateIdChar: PropTypes.func.isRequired,
};

export default CharList;
