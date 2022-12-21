import React from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChar: null,
    };
  }

  updateIdChar = (idChar) => {
    this.setState({
      selectedChar: idChar,
    });
  };
  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList updateIdChar={this.updateIdChar} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo selectedChar={this.state.selectedChar} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
