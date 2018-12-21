import { call, put, takeEvery } from "redux-saga/effects";

import { authInit } from "../Auth/ducks";

const INITIALIZE_APPLICATION = "ci-watcher/INITIALIZE_APPLICATION";
const INITIALIZE_APPLICATION_SUCCESS =
  "ci-watcher/INITIALIZE_APPLICATION_SUCCESS";

interface InitializeApplicationAction {
  payload: {};
  type: typeof INITIALIZE_APPLICATION;
}

interface InitializeApplicationSuccessAction {
  payload: {};
  type: typeof INITIALIZE_APPLICATION_SUCCESS;
}

export type MainAction =
  | InitializeApplicationAction
  | InitializeApplicationSuccessAction;

export const createInitializeApplicationAction = (): InitializeApplicationAction => ({
  payload: {},
  type: INITIALIZE_APPLICATION
});

export const createInitializeApplicationSuccessAction = (): InitializeApplicationSuccessAction => ({
  payload: {},
  type: INITIALIZE_APPLICATION_SUCCESS
});

interface MainState {
  initialized: boolean;
}

export const reducer = (
  state: MainState = { initialized: false },
  action: MainAction
) => {
  switch (action.type) {
    case INITIALIZE_APPLICATION_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
};

function* initSaga() {
  yield call(authInit);
  yield put(createInitializeApplicationSuccessAction());
}

export function* mainSaga() {
  yield takeEvery(INITIALIZE_APPLICATION, initSaga);
}
