import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import carouselItemsReducer, { carouselItemsSaga } from './carouselItems';
import moviesReducer, { moviesSaga } from './movies';
import movieReducer, { movieSaga } from './movie';
import ticketingReducer, { ticketingSaga } from './ticketing';
import playSeqsReducer, { playSeqsSaga } from './playSeqs';
import { browserHistorySaga } from './browserHistory';

export function* rootSaga() {
  yield all([
    carouselItemsSaga(),
    moviesSaga(),
    movieSaga(),
    ticketingSaga(),
    playSeqsSaga(),
    browserHistorySaga(),
  ]);
}

const rootReducer = combineReducers({
  carouselItems: carouselItemsReducer,
  movies: moviesReducer,
  movie: movieReducer,
  ticketing: ticketingReducer,
  playSeqs: playSeqsReducer,
});

export default rootReducer;
