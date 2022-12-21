import React from 'react';
import MarvelServices from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {},
      loading: true,
      error: false,
    };
    console.log('constructor');
    this.marvelService = new MarvelServices();
  }

  componentDidMount = () => {
    console.log('mount');
    this.getChar();
  };

  onCharLoaded = (char) => {
    console.log('update');
    this.setState({ char, loading: false, error: false });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  getChar = () => {
    const idChar = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharLoading();
    this.marvelService
      .getCharacter(idChar)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    console.log('render');
    const { char, loading, error } = this.state;

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
          <button className="button button__main" onClick={this.getChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = (obj) => {
  const { name, description, thumbnail, homepage, wiki } = obj.char;
  const incorrectImage = thumbnail
    .split('/')
    .includes('image_not_available.jpg');
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className={
          incorrectImage ? 'randomchar__img-not_found' : 'randomchar__img'
        }
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
