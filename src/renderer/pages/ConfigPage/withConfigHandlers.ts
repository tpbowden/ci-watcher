import {
  compose,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from "recompose";
import { Platform } from "renderer/platforms";

interface State {
  platform?: Platform;
  token?: string;
  stage: number;
}

// tslint:disable-next-line: interface-over-type-literal
type Handlers = {
  back: StateHandler<State>;
  setPlatform: StateHandler<State>;
  setToken: StateHandler<State>;
};

export type ConfigProps = State & Handlers;

const withConfigHandlers = withStateHandlers<State, Handlers, {}>(
  { stage: 0 },
  {
    back: ({ stage }) => () => ({ stage: stage - 1 }),
    setPlatform: ({ stage }) => (platform) => ({ stage: stage + 1, platform }),
    setToken: ({ stage, platform }) => (token) => ({ stage: stage + 1, token })
  },
);

export default withConfigHandlers;
