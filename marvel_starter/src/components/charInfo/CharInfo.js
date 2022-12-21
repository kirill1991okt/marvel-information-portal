import React from 'react';
import MarvelServices from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: null,
      loading: false,
      error: false,
    };
    this.marvelServices = new MarvelServices();
  }

  componentDidMount = () => {
    this.updateChar();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.selectedChar !== this.props.selectedChar) {
      this.updateChar();
    }
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
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

  updateChar = () => {
    if (!this.props.selectedChar) {
      return;
    }
    this.onCharLoading();
    this.marvelServices
      .getCharacter(this.props.selectedChar)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };
  render() {
    const { char, loading, error } = this.state;
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(!char || loading || error) ? <View char={char} /> : null;
    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const comicsCutArr = comics.slice(0, 10);
  const incorrectImage = thumbnail
    .split('/')
    .includes('image_not_available.jpg');
  return (
    <React.Fragment>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={incorrectImage ? { objectFit: 'fill' } : null}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comicsCutArr.length
          ? comicsCutArr.map((item, i) => {
              return (
                <li className="char__comics-item" key={i}>
                  {item.name}
                </li>
              );
            })
          : 'There is not comics'}
      </ul>
    </React.Fragment>
  );
};

export default CharInfo;
