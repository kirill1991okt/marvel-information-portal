import React from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

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
          <RandomChar />
          <div className="char__content">
            <CharList updateIdChar={this.updateIdChar} />
            <CharInfo selectedChar={this.state.selectedChar} />
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
