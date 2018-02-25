import {
  compose,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from "recompose";

interface State {
  platform?: string;
}

interface Updaters extends StateHandlerMap<State> {
  selectPlatform: StateHandler<State>;
}

interface OuterProps {
  initialPlatform?: string;
}

export type PlatformProps = State & Updaters & OuterProps;

const withPlatformHandlers = withStateHandlers<State, Updaters, OuterProps>(
  ({ initialPlatform }) => ({
    platform: initialPlatform
  }),
  {
    selectPlatform: () => (newValue) => ({ platform: newValue })
  }
);

export default withPlatformHandlers;
