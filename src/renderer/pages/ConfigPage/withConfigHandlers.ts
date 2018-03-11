import {
  compose,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from "recompose";
import platforms, { Platform } from "renderer/platforms";

interface State {
  platform: Platform;
  token: string;
  stage: number;
}

// tslint:disable-next-line: interface-over-type-literal
type Handlers = {
  next: StateHandler<State>;
  back: StateHandler<State>;
  setPlatform: StateHandler<State>;
  setToken: StateHandler<State>;
};

export type ConfigProps = State & Handlers;

const withConfigHandlers = withStateHandlers<State, Handlers, {}>(
  {
    stage: 0,
    token: "",
    platform: platforms[0]
  },
  {
    next: ({ stage }) => () => ({ stage: stage + 1 }),
    back: ({ stage }) => () => ({ stage: stage - 1 }),
    setPlatform: () => ({ target: { value: platform } }) => ({ platform }),
    setToken: () => ({ target: { value: token } }) => ({ token })
  },
);

export default withConfigHandlers;
