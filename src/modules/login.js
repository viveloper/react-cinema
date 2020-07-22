import { takeLatest, call, put } from 'redux-saga/effects';
import * as loginApi from '../api/login';
import * as api from '../api';

const LOGIN = 'users/LOGIN';
const LOGIN_SUCCESS = 'users/LOGIN_SUCCESS';
const LOGIN_ERROR = 'users/LOGIN_ERROR';
const LOGOUT = 'users/LOGOUT';
const LOGOUT_SUCCESS = 'users/LOGOUT_SUCCESS';
const LOGOUT_ERROR = 'users/LOGOUT_ERROR';

export const login = (email, password) => ({
  type: LOGIN,
  payload: {
    email,
    password,
  },
});

export const logout = (email) => ({
  type: LOGOUT,
  payload: email,
});

// worker saga
function* loginWorkerSaga(action) {
  const { email, password } = action.payload;
  try {
    const { token, user } = yield call(api.login, email, password);
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
  } catch (e) {
    yield put({
      type: LOGIN_ERROR,
      payload: e,
    });
  }
}
function* logoutWorkerSaga(action) {
  const email = action.payload;
  try {
    yield call(loginApi.logout, email);
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* loginSaga() {
  yield takeLatest(LOGIN, loginWorkerSaga);
  yield takeLatest(LOGOUT, logoutWorkerSaga);
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        data: null,
        error: null,
      };
    case LOGOUT_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
