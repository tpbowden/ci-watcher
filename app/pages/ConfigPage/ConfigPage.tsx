import Button from "material-ui/Button";
import Stepper, {Step, StepContent, StepLabel } from "material-ui/Stepper";
import React from "react";
import {RouteComponentProps } from "react-router";
import {compose, StateHandler, withHandlers, withState } from "recompose";
import PlatformSelectStep from "./PlatformSelectStep";

interface Platform {
  name: string;
}

interface State {
  stage: number;
  platform: string;
}

interface EventHandlers {
  next(): void;
  prev(): void;
  selectPlatform(e: React.FormEvent<HTMLInputElement>): void;
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

interface Props extends State, EventHandlers, StateHandlers {}

const ConfigPage: React.SFC<Props> = ({stage, next, prev, setPlatform, selectPlatform, platform}) => (
  <Stepper activeStep={stage} orientation="vertical">
    <PlatformSelectStep
      options={platforms}
      value={platform}
      onSubmit={next}
      onChange={selectPlatform}/>
    <Step>
      <StepLabel>Enter your API key</StepLabel>
      <StepContent><h1>Enter your API key</h1>
        <Button size="small" variant="raised" color="primary" onClick={next}>Next</Button>
        <Button size="small" variant="raised" onClick={prev}>Back</Button>
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Select projects</StepLabel>
      <StepContent><h1>Select projects</h1>
        <Button size="small" variant="raised" onClick={prev}>Back</Button>
      </StepContent>
    </Step>
  </Stepper>
);

interface StateHandlers {
  setStage: StateHandler<State>;
  setPlatform: StateHandler<State>;
}

const enhance = compose<Props, {}>(
  withState("stage", "setStage", 0),
  withState("platform", "setPlatform", null),
  withHandlers<StateHandlers, EventHandlers>({
    next: ({setStage}) => () => setStage((stage: number) => stage + 1),
    prev: ({setStage}) => () => setStage((stage: number) => stage - 1),
    selectPlatform: ({setPlatform}) => (e: React.FormEvent<HTMLInputElement>) => setPlatform(e.currentTarget.value),
  }),
);

export default enhance(ConfigPage);
