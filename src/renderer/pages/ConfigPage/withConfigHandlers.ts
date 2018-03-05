import {
  compose,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from "recompose";

interface State {
  platform: string;
  token: string;
}

interface Handlers extends StateHandlerMap<State> {
  setPlatform: StateHandler<State>;
}

export type PlatformProps = State & Handlers;

const withPlatformHandlers = withStateHandlers<State, Handlers, {}>(
  {
    platform: "Circle CI",
    token: ""
  },
  {
    setPlatform: ({ token, ...state }) => ({ target: { value } }) => ({
      ...state,
      token
    }),
    setToken: ({ platform, ...state }) => ({ target: { value } }) => ({
      ...state,
      platform
    })
  }
);

export default withPlatformHandlers;
