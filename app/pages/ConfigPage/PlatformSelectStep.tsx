import React from 'react';
import {Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import { compose, withHandlers, ComponentEnhancer, StateHandler } from 'recompose';

interface OuterProps {
  next(): void
}

interface EventHandlers {
  validate(): void
}

interface Props extends OuterProps, EventHandlers {
} 

const PlatformSelectStep: React.SFC<Props> = ({ validate, next, ...rest }) => (
  <Step {...rest}>
    <StepLabel>Select a platform</StepLabel>
    <StepContent><h1>Select a platform</h1>
      <Button size="small" raised color="primary" onClick={validate}>Next</Button>
    </StepContent>
  </Step>
)

const enhance = compose<Props, OuterProps>(
  withHandlers<Props, EventHandlers>({
    validate: (props) => (e: Event) => props.next()
  })
)

export default enhance(PlatformSelectStep);
