import {
  withHandlers
} from 'recompose';

export interface ValidationProps {
  validatePlatformSelection(): void;
}

interface OuterProps {
  platform: any;
  next(): void;
}

const withValidations = withHandlers<OuterProps, ValidationProps>({
  validatePlatformSelection: ({ platform, next }) => () => platform && next(),
})

export default withValidations;
