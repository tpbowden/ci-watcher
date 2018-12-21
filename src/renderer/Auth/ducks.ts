import { ipcRenderer } from "electron";
import { call, put } from "redux-saga/effects";

interface AuthState {
  idToken?: string;
  refreshToken?: string;
}

const AUTH_SUCCESS = "ci-watcher/AUTH_SUCCESS";
const AUTH_ERROR = "ci-watcher/AUTH_ERROR";

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

export const createAuthSuccessAction = (
  idToken: string
): AuthSuccessAction => ({
  payload: {
    idToken
  },
  type: AUTH_SUCCESS
});

export const createAuthErrorAction = (error: Error): AuthErrorAction => ({
  payload: { error },
  type: AUTH_ERROR
});

export type AuthAction = AuthSuccessAction | AuthErrorAction;

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

export function* authInit() {
  try {
    const token = yield call(getToken);
    yield put(createAuthSuccessAction(token));
  } catch (e) {
    yield put(createAuthErrorAction(e));
  }
}
