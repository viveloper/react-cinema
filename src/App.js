import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import MoviePage from './pages/Movie';
import MovieListPage from './pages/MovieList';
import MovieDetailPage from './pages/MovieDetail';
import Ticketing from './pages/Ticketing';
import LoginPage from './pages/Login';
import ErrorPage from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/movie" component={MoviePage} />
        <Route path="/movie/list" component={MovieListPage} />
        <Route path="/movie/movieDetailView" component={MovieDetailPage} />
        <Route exact path="/ticketing" component={Ticketing} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
