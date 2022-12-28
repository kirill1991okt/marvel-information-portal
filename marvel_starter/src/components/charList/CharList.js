import React from 'react';
import PropTypes from 'prop-types';
import MarvelServices from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataChar: [],
      loading: true,
      error: false,
      newItemLoading: false,
      offset: 210,
      itemLoaded: false,
    };
    this.itemRefs = [];
    this.marvelService = new MarvelServices();
  }

  componentDidMount = () => {
    this.onRequest();
  };

  onAllCharLoaded = (newDataChar) => {
    let loaded = false;
    if (newDataChar.length < 9) {
      loaded = true;
    }
    this.setState(({ dataChar, offset }) => ({
      dataChar: [...dataChar, ...newDataChar],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      itemLoaded: loaded,
    }));
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onAllCharLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  setClassOnSelectedChar = (elem) => {
    this.itemRefs.push(elem);
  };

  addClass = (i) => {
    this.itemRefs.forEach((item) => {
      item.classList.remove('char__item_selected');
    });
    this.itemRefs[i].classList.add('char__item_selected');
    this.itemRefs[i].focus();
  };

  charItems = (arrList) => {
    const elements = arrList.map(({ thumbnail, name, id }, i) => {
      return (
        <li
          ref={this.setClassOnSelectedChar}
          tabIndex={0}
          className='char__item'
          key={id}
          onClick={() => {
            this.addClass(i);
            this.props.updateIdChar(id);
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              this.addClass(i);
              this.props.updateIdChar(id);
            }
          }}
        >
          <img src={thumbnail} alt='abyss' />
          <div className='char__name'>{name}</div>
        </li>
      );
    });
    return <ul className='char__grid'>{elements}</ul>;
  };

  render() {
    const { dataChar, loading, error, newItemLoading, offset, itemLoaded } =
      this.state;
    const listItem = this.charItems(dataChar);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? listItem : null;
    return (
      <div className='char__list'>
        {errorMessage}
        {spinner}
        {content}
        <button
          className='button button__main button__long'
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}
          style={{ display: itemLoaded ? 'none' : 'block' }}
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  updateIdChar: PropTypes.func.isRequired,
};

export default CharList;
