import { takeLatest, call, put } from 'redux-saga/effects';
import * as moviesApi from '../api/movies';

const GET_MOVIES = 'GET_MOVIES';
const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
const GET_MOVIES_ERROR = 'GET_MOVIES_ERROR';

export const getMovies = () => ({ type: GET_MOVIES });

function* getMoviesSaga() {
  try {
    const data = yield call(moviesApi.getMovies);
    yield put({
      type: GET_MOVIES_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: GET_MOVIES_ERROR,
      payload: e,
    });
  }
}

export function* moviesSaga() {
  yield takeLatest(GET_MOVIES, getMoviesSaga);
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_MOVIES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_MOVIES_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default moviesReducer;
