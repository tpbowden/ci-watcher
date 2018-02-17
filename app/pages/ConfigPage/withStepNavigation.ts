import {
  compose,
  withState,
  withHandlers,
  StateHandler,
} from 'recompose';

interface NavigationState {
  stage: number;
  setStage: StateHandler<NavigationState>;
}

interface NavigationHandlers {
  next(): void;
  prev(): void;
}

export interface NavigationProps extends NavigationState, NavigationHandlers {}

const withStepNavigation= compose<{}, {}>(
  withState("stage", "setStage", 0),
  withHandlers<NavigationState, NavigationHandlers>({
    next: ({ setStage }) => () => setStage((stage: number) => stage + 1),
    prev: ({ setStage }) => () => setStage((stage: number) => stage - 1),
  })
);

export default withStepNavigation;
