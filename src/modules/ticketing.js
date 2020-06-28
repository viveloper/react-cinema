import { takeLatest, call, put } from 'redux-saga/effects';
import * as ticketingApi from '../api/ticketing';

// action type
const GET_TICKETING_INFO = 'GET_TICKETING_INFO';
const GET_TICKETING_INFO_SUCCESS = 'GET_TICKETING_INFO_SUCCESS';
const GET_TICKETING_INFO_ERROR = 'GET_TICKETING_INFO_ERROR';

// action creator
export const getTicketingInfo = ({ playDate, cinemaId, movieCode }) => ({
  type: GET_TICKETING_INFO,
  payload: {
    playDate,
    cinemaId,
    movieCode,
  },
});

// worker saga
function* getTicketingInfoSaga(action) {
  const { playDate, cinemaId, movieCode } = action.payload;
  try {
    const ticketingInfo = yield call(
      ticketingApi.getTicketingInfo,
      playDate,
      cinemaId,
      movieCode
    );
    yield put({
      type: GET_TICKETING_INFO_SUCCESS,
      payload: ticketingInfo,
    });
  } catch (e) {
    yield put({
      type: GET_TICKETING_INFO_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* ticketingSaga() {
  yield takeLatest(GET_TICKETING_INFO, getTicketingInfoSaga);
}

// initial state
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// reducer
export default function ticketingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TICKETING_INFO:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_TICKETING_INFO_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_TICKETING_INFO_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
