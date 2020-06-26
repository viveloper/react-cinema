import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import carouselItemsReducer, { carouselItemsSaga } from './carouselItems';
import moviesReducer, { moviesSaga } from './movies';
import { browserHistorySaga } from './browserHistory';

export function* rootSaga() {
  yield all([carouselItemsSaga(), moviesSaga(), browserHistorySaga()]);
}

const rootReducer = combineReducers({
  carouselItems: carouselItemsReducer,
  movies: moviesReducer,
});

export default rootReducer;
