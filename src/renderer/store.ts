import {
  applyMiddleware,
  combineReducers,
  createStore,
  Dispatch as ReduxDispatch
} from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import { AuthAction, reducer as authReducer } from "./Auth/ducks";
import { MainAction, mainSaga, reducer as mainReducer } from "./Main/ducks";

const reducer = combineReducers({
  auth: authReducer,
  main: mainReducer
});

const sagaMiddleware = createSagaMiddleware();

type Action = MainAction | AuthAction;

export type Dispatch = ReduxDispatch<Action>;

export type State = ReturnType<typeof reducer>;

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

function* rootSaga() {
  yield all([mainSaga()]);
}

sagaMiddleware.run(rootSaga);
