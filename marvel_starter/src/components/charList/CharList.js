import React from 'react';
import MarvelServices from '../../services/MarvelService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataChar: [],
      loading: true,
      error: false,
    };
    this.marvelService = new MarvelServices();
  }

  onAllCharLoaded = (dataChar) => {
    console.log(dataChar);
    this.setState({ dataChar, loading: false });
  };

  getAllChar = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onAllCharLoaded)
      .catch(this.onError);
  };

  componentDidMount = () => {
    this.getAllChar();
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  charItems = (arrList) => {
    const elements = arrList.map(({ thumbnail, name, id }) => {
      return (
        <li className="char__item" key={id}>
          <img src={thumbnail} alt="abyss" />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{elements}</ul>;
  };

  render() {
    const { dataChar, loading, error } = this.state;
    const listItem = this.charItems(dataChar);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? listItem : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
