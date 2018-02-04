import React from 'react';
import {Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import { compose, withHandlers, ComponentEnhancer, StateHandler } from 'recompose';

interface Props extends OuterProps, Handlers {
} 

const PlatformSelectStep: React.SFC<Props> = ({ validate, next, ...rest }) => (
  <Step {...rest}>
    <StepLabel>Select a platform</StepLabel>
    <StepContent><h1>Select a platform</h1>
      <Button size="small" raised color="primary" onClick={validate}>Next</Button>
    </StepContent>
  </Step>
)

interface OuterProps {
  next(): void
}

interface Handlers {
  validate(): void
}

const enhance = compose<Props, OuterProps>(
  withHandlers<Props, Handlers>({
    validate: (props) => (e: Event) => props.next()
  })
)

export default enhance(PlatformSelectStep);
