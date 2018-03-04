import { compose, withHandlers, withState } from "recompose";

export interface ValidationProps extends State {
  validatePlatformSelection(): void;
}

interface OuterProps {
  platform: string;
  next(): void;
}

interface State {
  platformSelectError?: string;
}

interface StateHandlers {
  setPlatformSelectError(error: string | undefined): void;
}

const withValidations = compose(
  withState("platformSelectError", "setPlatformSelectError", undefined),
  withHandlers<OuterProps & StateHandlers, ValidationProps>({
    validatePlatformSelection: ({
      setPlatformSelectError,
      platform,
      next
    }) => () => {
      if (platform) {
        setPlatformSelectError(undefined);
        next();
      } else {
        setPlatformSelectError("Please select a platform");
      }
    }
  })
);

export default withValidations;
