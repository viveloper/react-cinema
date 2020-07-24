import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as api from '../api';
import { setUser } from './login';

// action type
const GET_MOVIE_DETAIL = 'GET_MOVIE_DETAIL';
const GET_MOVIE_DETAIL_SUCCESS = 'GET_MOVIE_DETAIL_SUCCESS';
const GET_MOVIE_DETAIL_ERROR = 'GET_MOVIE_DETAIL_ERROR';
const GET_MOVIE_REVIEW = 'GET_MOVIE_REVIEW';
const GET_MOVIE_REVIEW_SUCCESS = 'GET_MOVIE_REVIEW_SUCCESS';
const GET_MOVIE_REVIEW_ERROR = 'GET_MOVIE_REVIEW_ERROR';
const ADD_MOVIE_REVIEW = 'ADD_MOVIE_REVIEW';
const ADD_MOVIE_REVIEW_SUCCESS = 'ADD_MOVIE_REVIEW_SUCCESS';
const ADD_MOVIE_REVIEW_ERROR = 'ADD_MOVIE_REVIEW_ERROR';
const DELETE_MOVIE_REVIEW = 'DELETE_MOVIE_REVIEW';
const DELETE_MOVIE_REVIEW_SUCCESS = 'DELETE_MOVIE_REVIEW_SUCCESS';
const DELETE_MOVIE_REVIEW_ERROR = 'DELETE_MOVIE_REVIEW_ERROR';

// action creator
export const getMovieDetail = (movieCode) => ({
  type: GET_MOVIE_DETAIL,
  payload: movieCode,
});

export const getMovieReview = ({ movieCode, page, count, sortType }) => ({
  type: GET_MOVIE_REVIEW,
  payload: { movieCode, page, count, sortType },
});

export const addMovieReview = ({ movieCode, reviewText, evaluation }) => ({
  type: ADD_MOVIE_REVIEW,
  payload: { movieCode, reviewText, evaluation },
});

export const deleteMovieReview = ({ movieCode, reviewId }) => ({
  type: DELETE_MOVIE_REVIEW,
  payload: { movieCode, reviewId },
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
  const { movieCode, page, count, sortType } = action.payload;
  try {
    const movieReview = yield call(
      api.getMovieReview,
      movieCode,
      page,
      count,
      sortType
    );
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

function* addMovieReviewSaga(action) {
  const { movieCode, reviewText, evaluation } = action.payload;
  const { token, user } = yield select((state) => state.login.data);
  try {
    const data = yield call(
      api.addReivew,
      token,
      movieCode,
      reviewText,
      evaluation
    );
    yield put({ type: ADD_MOVIE_REVIEW_SUCCESS });
    yield put(
      setUser({
        ...user,
        reviewList: [...user.reviewList, data.review.ReviewID],
      })
    );
    yield put(
      getMovieReview({ movieCode, page: 1, count: 10, sortType: 'recent' })
    );
  } catch (e) {
    yield put({
      type: ADD_MOVIE_REVIEW_ERROR,
      payload: e,
    });
  }
}

function* deleteMovieReviewSaga(action) {
  const { movieCode, reviewId } = action.payload;
  const { token, user } = yield select((state) => state.login.data);
  try {
    yield call(api.deleteReview, token, movieCode, reviewId);
    yield put({ type: DELETE_MOVIE_REVIEW_SUCCESS });
    yield put(
      setUser({
        ...user,
        reviewList: user.reviewList.filter((item) => item !== reviewId),
      })
    );
    yield put(
      getMovieReview({ movieCode, page: 1, count: 10, sortType: 'recent' })
    );
  } catch (e) {
    yield put({
      type: DELETE_MOVIE_REVIEW_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* movieSaga() {
  yield takeLatest(GET_MOVIE_DETAIL, getMovieDetailSaga);
  yield takeLatest(GET_MOVIE_REVIEW, getMovieReviewSaga);
  yield takeLatest(ADD_MOVIE_REVIEW, addMovieReviewSaga);
  yield takeLatest(DELETE_MOVIE_REVIEW, deleteMovieReviewSaga);
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
          data: state.movieReview.data,
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
    case ADD_MOVIE_REVIEW:
      return {
        ...state,
        movieReview: {
          loading: true,
          data: state.movieReview.data,
          error: null,
        },
      };
    case ADD_MOVIE_REVIEW_SUCCESS:
      return {
        ...state,
        movieReview: {
          loading: false,
          data: state.movieReview.data,
          error: null,
        },
      };
    case ADD_MOVIE_REVIEW_ERROR:
      return {
        ...state,
        movieReview: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    case DELETE_MOVIE_REVIEW:
      return {
        ...state,
        movieReview: {
          loading: true,
          data: state.movieReview.data,
          error: null,
        },
      };
    case DELETE_MOVIE_REVIEW_SUCCESS:
      return {
        ...state,
        movieReview: {
          loading: false,
          data: state.movieReview.data,
          error: null,
        },
      };
    case DELETE_MOVIE_REVIEW_ERROR:
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
