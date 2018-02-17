import Button from "material-ui/Button";
import Stepper, {Step, StepContent, StepLabel } from "material-ui/Stepper";
import React from "react";
import {RouteComponentProps } from "react-router";
import {compose, StateHandler, withHandlers, withState } from "recompose";
import PlatformSelectStep from "./PlatformSelectStep";
import AuthenticationStep from "./AuthenticationStep";
import withStepNavigation, { NavigationProps } from './withStepNavigation';

interface Platform {
  name: string;
}

interface PlatformMap {
  [key: string]: Platform;
}

const platforms = [
  {name: "Circle CI"},
  {name: "Jenkins"},
  {name: "Travis"},
]

const platformMap: PlatformMap = platforms.reduce(
  (acc: PlatformMap, p: Platform) => Object.assign({}, acc, {[p.name]: p}),
  {}
);

interface Props extends NavigationProps, PlatformProps, ValidationHandlers {}

const ConfigPage: React.SFC<Props> = ({validatePlatformSelection, stage, next, prev, selectPlatform, platform}) => (
  <Stepper activeStep={stage} orientation="vertical">
    <PlatformSelectStep
      options={platforms}
      value={platform}
      onSubmit={validatePlatformSelection}
      onChange={selectPlatform}/>
    <AuthenticationStep
      next={next}
      prev={prev}
      platform={platform!} />
    <Step>
      <StepLabel>Select projects</StepLabel>
      <StepContent><h1>Select projects</h1>
        <Button size="small" variant="raised" onClick={prev}>Back</Button>
      </StepContent>
    </Step>
  </Stepper>
);

interface ValidationHandlers {
  validatePlatformSelection(): void;
}

interface PlatformState {
  platform?: string;
  setPlatform: StateHandler<PlatformState>;
}

interface PlatformHandlers {
  selectPlatform(e: React.FormEvent<HTMLInputElement>): void;
}

interface PlatformProps extends PlatformState, PlatformHandlers {}


const withPlatformHandlers = compose(
  withState("platform", "setPlatform", null),
  withHandlers<PlatformState, PlatformHandlers>({
    selectPlatform: ({ setPlatform }) => (e: React.FormEvent<HTMLInputElement>) => setPlatform(e.currentTarget.value),
  })
);

const withValidationHandlers = withHandlers<PlatformHandlers & PlatformState & NavigationProps, ValidationHandlers>({
  validatePlatformSelection: ({ platform, next }) => () => platform && next(),
})

const enhance = compose<Props, {}>(
  withStepNavigation,
  withPlatformHandlers,
  withValidationHandlers,
);

export default enhance(ConfigPage);
