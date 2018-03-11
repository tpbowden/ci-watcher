import {
  compose,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from "recompose";
import platforms, { Platform } from "renderer/platforms";

interface State {
  platform: Platform;
  stage: number;
  token: string;
}

// tslint:disable-next-line: interface-over-type-literal
type Handlers = {
  back: StateHandler<State>;
  next: StateHandler<State>;
  setPlatform: StateHandler<State>;
  setToken: StateHandler<State>;
};

export type ConfigProps = State & Handlers;

const withConfigHandlers = withStateHandlers<State, Handlers, {}>(
  {
    platform: platforms[0],
    stage: 0,
    token: ""
  },
  {
    back: ({ stage }) => () => ({ stage: stage - 1 }),
    next: ({ stage }) => () => ({ stage: stage + 1 }),
    setPlatform: () => ({ target: { value: platform } }) => ({ platform }),
    setToken: () => ({ target: { value: token } }) => ({ token })
  }
);

export default withConfigHandlers;
