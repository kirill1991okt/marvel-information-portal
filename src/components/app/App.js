import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const Page404 = React.lazy(() => import('../pages/404'));
const MainPage = React.lazy(() => import('../pages/MainPage'));
const ComicsPage = React.lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = React.lazy(() =>
  import('../pages/singleComicPage/SingleComicPage')
);
const SingleNamePage = React.lazy(() =>
  import('../pages/singleNamePage/SingleNamePage')
);

function App() {
  return (
    <Router basename='/marvel-information-portal'>
      <div className='app'>
        <AppHeader />
        <main>
          <React.Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                exact
                path='/marvel-information-portal'
                element={<MainPage />}
              />
              <Route path='/comics' element={<ComicsPage />} />
              <Route path='/comics/:comicId' element={<SingleComicPage />} />
              <Route path='characters/:charName' element={<SingleNamePage />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </React.Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
