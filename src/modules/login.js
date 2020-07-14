import { takeLatest, call, put } from 'redux-saga/effects';
import * as loginApi from '../api/login';

const LOGIN = 'users/LOGIN';
const LOGIN_SUCCESS = 'users/LOGIN_SUCCESS';
const LOGIN_ERROR = 'users/LOGIN_ERROR';

export const login = (email, password) => ({
  type: LOGIN,
  payload: {
    email,
    password,
  },
});

// worker saga
function* loginWorkerSaga(action) {
  const { email, password } = action.payload;
  try {
    const data = yield call(loginApi.login, email, password);
    yield put({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* loginSaga() {
  yield takeLatest(LOGIN, loginWorkerSaga);
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
    default:
      return state;
  }
}
