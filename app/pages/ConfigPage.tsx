import React from 'react';
import Stepper, {Step, StepLabel, StepContent } from 'material-ui/Stepper';

const ConfigPage = () => (
  <Stepper activeStep={2} orientation="vertical">
    <Step>
      <StepLabel>Select a platform</StepLabel>
      <StepContent><h1>Select a platform</h1></StepContent>
    </Step>
    <Step>
      <StepLabel>Enter your API key</StepLabel>
      <StepContent><h1>Enter your API key</h1></StepContent>
    </Step>
    <Step>
      <StepLabel>Select projects</StepLabel>
      <StepContent><h1>Select projects</h1></StepContent>
    </Step>
  </Stepper>
);

export default ConfigPage;
