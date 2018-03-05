import {
  compose,
  StateHandler,
  StateHandlerMap,
  withState,
  withStateHandlers
} from "recompose";

interface State {
  stage: number;
}

interface Updaters extends StateHandlerMap<State> {
  next: StateHandler<State>;
  prev: StateHandler<State>;
}

export type NavigationProps = State & Updaters;

const withStepNavigation = withStateHandlers<State, Updaters, {}>(
  { stage: 0 },
  {
    next: ({ stage }) => () => ({ stage: stage + 1 }),
    prev: ({ stage }) => () => ({ stage: stage - 1 })
  }
);

export default withStepNavigation;
