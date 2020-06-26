import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieListPage from './pages/MovieListPage';
import MovieDetailPage from './pages/MovieDetailPage';
// import Ticketing from './pages/Ticketing';
import LoginPage from './pages/Login';
import ErrorPage from './pages/Error';

import rootReducer, { rootSaga } from './modules';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <Router history={customHistory}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/movies" exact component={MoviesPage} />
          <Route path="/movies/:listType" component={MovieListPage} />
          <Route path="/movieDetail/:movieCode" component={MovieDetailPage} />
          {/* <Route path="/ticketing" exact component={Ticketing} /> */}
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
