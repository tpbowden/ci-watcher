import {
  compose,
  StateHandler,
  StateHandlerMap,
  withStateHandlers,
} from 'recompose';

interface PlatformState {
  platform?: string;
}

interface PlatformUpdaters extends StateHandlerMap<PlatformState> {
  selectPlatform: StateHandler<PlatformState>;
}

interface PlatformOuterProps {
  initialPlatform?: string;
}

export type PlatformProps = PlatformState & PlatformUpdaters & PlatformOuterProps;

const withPlatformHandlers = withStateHandlers<PlatformState, PlatformUpdaters, PlatformOuterProps>(
  ({ initialPlatform }) => ({
    platform: initialPlatform,
  }),
  {
    selectPlatform: () => (newValue) => ({ platform: newValue }),
  }
);

export default withPlatformHandlers;
