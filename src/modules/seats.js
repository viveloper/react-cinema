import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as api from '../api';
import { setUser } from './login';
import { getPlaySeqs } from './playSeqs';

// action type
const GET_SEATS = 'GET_SEATS';
const GET_SEATS_SUCCESS = 'GET_SEATS_SUCCESS';
const GET_SEATS_ERROR = 'GET_SEATS_ERROR';
const RESERVE_SEATS = 'RESERVE_SEATS';
const RESERVE_SEATS_SUCCESS = 'RESERVE_SEATS_SUCCESS';
const RESERVE_SEATS_ERROR = 'RESERVE_SEATS_ERROR';

// action creator
export const getSeats = (params) => ({ type: GET_SEATS, payload: params });
export const reserveSeats = (params) => ({
  type: RESERVE_SEATS,
  payload: params,
});

// worker saga
function* getSeatsSaga(action) {
  const {
    cinemaId,
    screenId,
    playDate,
    playSequence,
    screenDivisionCode,
  } = action.payload;
  try {
    const seats = yield call(
      api.getSeats,
      cinemaId,
      screenId,
      playDate,
      playSequence,
      screenDivisionCode
    );
    yield put({
      type: GET_SEATS_SUCCESS,
      payload: seats,
    });
  } catch (e) {
    yield put({
      type: GET_SEATS_ERROR,
      payload: e,
    });
  }
}
function* reserveSeatsSaga(action) {
  const {
    movieCode,
    movieName,
    posterUrl,
    viewGradeCode,
    divisionCode,
    detailDivisionCode,
    cinemaId,
    cinemaName,
    screenId,
    screenName,
    screenDivisionCode,
    screenDivisionName,
    playSequence,
    playDate,
    playDay,
    startTime,
    endTime,
    seatNoList,
    price,
  } = action.payload;
  const { token, user } = yield select((state) => state.login.data);
  try {
    const { ticketing } = yield call(
      api.reserveSeats,
      token,
      movieCode,
      movieName,
      posterUrl,
      viewGradeCode,
      divisionCode,
      detailDivisionCode,
      cinemaId,
      cinemaName,
      screenId,
      screenName,
      screenDivisionCode,
      screenDivisionName,
      playSequence,
      playDate,
      playDay,
      startTime,
      endTime,
      seatNoList,
      price
    );
    yield put({ type: RESERVE_SEATS_SUCCESS });
    yield put(
      setUser({
        ...user,
        ticketingList: [...user.ticketingList, ticketing],
      })
    );
    yield put(
      getPlaySeqs({
        playDate,
        divisionCode,
        detailDivisionCode,
        cinemaId,
      })
    );
    yield put(
      getSeats({
        cinemaId,
        screenId,
        playDate,
        playSequence,
        screenDivisionCode,
      })
    );
  } catch (e) {
    yield put({
      type: RESERVE_SEATS_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* seatsSaga() {
  yield takeLatest(GET_SEATS, getSeatsSaga);
  yield takeLatest(RESERVE_SEATS, reserveSeatsSaga);
}

// initial state
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// reducer
export default function seatsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEATS:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_SEATS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_SEATS_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case RESERVE_SEATS:
      return {
        loading: true,
        data: state.data,
        error: null,
      };
    case RESERVE_SEATS_SUCCESS:
      return {
        loading: false,
        data: state.data,
        error: null,
      };
    case RESERVE_SEATS_ERROR:
      return {
        loading: false,
        data: state.data,
        error: action.payload,
      };
    default:
      return state;
  }
}
