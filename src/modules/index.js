import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import carouselItemsReducer, { carouselItemsSaga } from './carouselItems';
import moviesReducer, { moviesSaga } from './movies';
import movieReducer, { movieSaga } from './movie';
import { browserHistorySaga } from './browserHistory';

export function* rootSaga() {
  yield all([
    carouselItemsSaga(),
    moviesSaga(),
    movieSaga(),
    browserHistorySaga(),
  ]);
}

const rootReducer = combineReducers({
  carouselItems: carouselItemsReducer,
  movies: moviesReducer,
  movie: movieReducer,
});

export default rootReducer;
