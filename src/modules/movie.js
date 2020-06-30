import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api';

// action type
const GET_MOVIE_DETAIL = 'GET_MOVIE_DETAIL';
const GET_MOVIE_DETAIL_SUCCESS = 'GET_MOVIE_DETAIL_SUCCESS';
const GET_MOVIE_DETAIL_ERROR = 'GET_MOVIE_DETAIL_ERROR';
const GET_MOVIE_REVIEW = 'GET_MOVIE_REVIEW';
const GET_MOVIE_REVIEW_SUCCESS = 'GET_MOVIE_REVIEW_SUCCESS';
const GET_MOVIE_REVIEW_ERROR = 'GET_MOVIE_REVIEW_ERROR';

// action creator
export const getMovieDetail = (movieCode) => ({
  type: GET_MOVIE_DETAIL,
  payload: movieCode,
});

export const getMovieReview = (movieCode) => ({
  type: GET_MOVIE_REVIEW,
  payload: movieCode,
});

// worker saga
function* getMovieDetailSaga(action) {
  const movieCode = action.payload;
  try {
    const movieDetail = yield call(api.getMovieDetail, movieCode);
    yield put({
      type: GET_MOVIE_DETAIL_SUCCESS,
      payload: movieDetail,
    });
  } catch (e) {
    yield put({
      type: GET_MOVIE_DETAIL_ERROR,
      payload: e,
    });
  }
}

function* getMovieReviewSaga(action) {
  const movieCode = action.payload;
  try {
    const movieReview = yield call(api.getMovieReview, movieCode, 25);
    yield put({
      type: GET_MOVIE_REVIEW_SUCCESS,
      payload: movieReview,
    });
  } catch (e) {
    yield put({
      type: GET_MOVIE_REVIEW_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* movieSaga() {
  yield takeLatest(GET_MOVIE_DETAIL, getMovieDetailSaga);
  yield takeLatest(GET_MOVIE_REVIEW, getMovieReviewSaga);
}

// initial state
const initialState = {
  movieDetail: {
    loading: false,
    data: null,
    error: null,
  },
  movieReview: {
    loading: false,
    data: null,
    error: null,
  },
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_MOVIE_DETAIL_SUCCESS:
      return {
        ...state,
        movieDetail: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_MOVIE_DETAIL_ERROR:
      return {
        ...state,
        movieDetail: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    case GET_MOVIE_REVIEW:
      return {
        ...state,
        movieReview: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_MOVIE_REVIEW_SUCCESS:
      return {
        ...state,
        movieReview: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_MOVIE_REVIEW_ERROR:
      return {
        ...state,
        movieReview: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
