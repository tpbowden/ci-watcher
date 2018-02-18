import Button from "material-ui/Button";
import Stepper, {Step, StepContent, StepLabel } from "material-ui/Stepper";
import React from "react";
import {RouteComponentProps } from "react-router";
import {
  compose,
  withHandlers,
} from "recompose";
import PlatformSelectStep from "./PlatformSelectStep";
import AuthenticationStep from "./AuthenticationStep";
import withStepNavigation, { NavigationProps } from './withStepNavigation';
import withPlatformHandlers, {PlatformProps } from './withPlatformHandlers';
import withValidations, {ValidationProps} from './withValidations';

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

type Props = NavigationProps & PlatformProps & ValidationProps;

const ConfigPage: React.SFC<Props> = ({validatePlatformSelection, stage, next, prev, selectPlatform, platform}) => (
  <Stepper activeStep={stage} orientation="vertical">
    <PlatformSelectStep
      options={platforms}
      value={platform}
      submit={validatePlatformSelection}
      change={selectPlatform}/>
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

const enhance = compose<Props, {}>(
  withStepNavigation,
  withPlatformHandlers,
  withValidations,
);

export default enhance(ConfigPage);
