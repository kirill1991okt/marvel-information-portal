import { useState } from 'react';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import FormChar from '../formChar/FormChar';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const updateIdChar = (idChar) => {
    setSelectedChar((selectedChar) => (selectedChar = idChar));
  };

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList updateIdChar={updateIdChar} />
        </ErrorBoundary>
        <div className="char__content-right">
          <ErrorBoundary>
            <CharInfo selectedChar={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <FormChar />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
