import { StateHandler, StateHandlerMap, withStateHandlers } from "recompose";

interface State {
  errors?: string;
}

interface Handlers extends StateHandlerMap<State> {
  validate: StateHandler<State>;
}

interface Props {
  onSubmit(): void;
}

export type ValidationProps = State & Handlers;

const withValidation = withStateHandlers<State, Handlers, Props>(
  { errors: undefined },
  {
    validate: (_, { onSubmit }) => () => {
      onSubmit();
      return {
        errors: undefined
      };
    }
  }
);

export default withValidation;
