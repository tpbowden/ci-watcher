import React from 'react';
import {withState, withHandlers, compose, StateHandler } from 'recompose';
import {RouteComponentProps } from 'react-router';
import Stepper, {Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import PlatformSelectStep from './PlatformSelectStep'

interface State {
  stage: number,
}

interface EventHandlers {
  next(): void
  prev(): void
}

interface Props extends State, EventHandlers {}

const ConfigPage: React.SFC<Props> = ({stage, next, prev}) => (
  <Stepper activeStep={stage} orientation="vertical">
    <PlatformSelectStep next={next}/>
    <Step>
      <StepLabel>Enter your API key</StepLabel>
      <StepContent><h1>Enter your API key</h1>
        <Button size="small" raised color="primary" onClick={next}>Next</Button>
        <Button size="small" raised onClick={prev}>Back</Button>
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Select projects</StepLabel>
      <StepContent><h1>Select projects</h1>
        <Button size="small" raised onClick={prev}>Back</Button>
      </StepContent>
    </Step>
  </Stepper>
);

interface StateHandlers {
  setStage: StateHandler<State>,
}

const enhance = compose<Props, {}>(
  withState(
    'stage',
    'setStage',
    0,
  ),
  withHandlers<StateHandlers, EventHandlers>({
    next: ({setStage}) => () => setStage((stage: number) => stage + 1),
    prev: ({setStage}) => () => setStage((stage: number) => stage - 1),
  })
)

export default enhance(ConfigPage);
