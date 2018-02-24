import {
  compose,
  withState,
  withStateHandlers,
  StateHandler,
  StateHandlerMap
} from "recompose";

interface State {
  stage: number;
}

interface Updaters extends StateHandlerMap<State> {
  next: StateHandler<State>;
  prev: StateHandler<State>;
}

interface OuterProps {
  initialStage?: number;
}

export type NavigationProps = State & Updaters & OuterProps;

const withStepNavigation = withStateHandlers<State, Updaters, OuterProps>(
  ({ initialStage = 0 }) => ({ stage: initialStage }),
  {
    next: ({ stage }) => () => ({ stage: stage + 1 }),
    prev: ({ stage }) => () => ({ stage: stage - 1 })
  }
);

export default withStepNavigation;
