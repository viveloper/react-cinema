import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import carouselItemsReducer, { carouselItemsSaga } from './carouselItems';
import moviesReducer, { moviesSaga } from './movies';
import movieReducer, { movieSaga } from './movie';
import ticketingReducer, { ticketingSaga } from './ticketing';
import { browserHistorySaga } from './browserHistory';

export function* rootSaga() {
  yield all([
    carouselItemsSaga(),
    moviesSaga(),
    movieSaga(),
    ticketingSaga(),
    browserHistorySaga(),
  ]);
}

const rootReducer = combineReducers({
  carouselItems: carouselItemsReducer,
  movies: moviesReducer,
  movie: movieReducer,
  ticketing: ticketingReducer,
});

export default rootReducer;
