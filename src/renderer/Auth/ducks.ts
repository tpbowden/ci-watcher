import { ipcRenderer } from "electron";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { State } from "../store";

interface AuthState {
  idToken?: string;
  refreshToken?: string;
  inProgress?: string;
}

const AUTHENTICATE = "ci-watcher/AUTHENTICATE";
const AUTH_SUCCESS = "ci-watcher/AUTH_SUCCESS";
const AUTH_ERROR = "ci-watcher/AUTH_ERROR";
const AUTH_IN_PROGRESS = "ci-watch/AUTH_IN_PROGRESS";

interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  payload: {};
}

interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
  payload: {
    idToken: string;
  };
}

interface AuthErrorAction {
  type: typeof AUTH_ERROR;
  payload: {
    error: Error;
  };
}

interface AuthInProgressAction {
  type: typeof AUTH_IN_PROGRESS;
  payload: {};
}

export const authenticate = (): AuthenticateAction => ({
  payload: {},
  type: AUTHENTICATE
});

export const authSuccess = (idToken: string): AuthSuccessAction => ({
  payload: {
    idToken
  },
  type: AUTH_SUCCESS
});

export const authError = (error: Error): AuthErrorAction => ({
  payload: { error },
  type: AUTH_ERROR
});

export const authInProgress = (): AuthInProgressAction => ({
  payload: {},
  type: AUTH_IN_PROGRESS
});

export type AuthAction =
  | AuthenticateAction
  | AuthSuccessAction
  | AuthErrorAction
  | AuthInProgressAction;

export const reducer = (state: AuthState = {}, action: AuthAction) => {
  return state;
};

const getToken = () =>
  new Promise<string | null>((resolve) => {
    ipcRenderer.once("get-token", (token: string | null) => {
      resolve(token);
    });
    ipcRenderer.send("get-token");
  });

const startLoginFlow = () =>
  new Promise<string>((resolve, reject) => {
    ipcRenderer.once("handle-login", (token: string, error?: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    ipcRenderer.send("handle-login");
  });

export function* authInit() {
  try {
    const token = yield call(getToken);
    yield put(authSuccess(token));
  } catch (e) {
    yield put(authError(e));
  }
}

function* handleLogin() {
  const inProgress = yield select((state: State) => state.auth.inProgress);
  if (inProgress) {
    return;
  }
  yield put(authInProgress());
  try {
    const token = yield call(startLoginFlow);
    yield put(authSuccess(token));
  } catch (e) {
    yield put(authError(e));
  }
}

export function* authSaga() {
  yield takeLatest(AUTHENTICATE, handleLogin);
}
