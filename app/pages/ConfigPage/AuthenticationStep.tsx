import React from "react";
import {Step, StepContent, StepLabel } from "material-ui/Stepper";
import Button from "material-ui/Button";
import TextField from 'material-ui/TextField';

interface Props {
  next(): void;
  prev(): void;
  platform: string;
}

const AuthenticationStep: React.SFC<Props> = ({ platform, next, prev, ...rest}) => (
  <Step {...rest }>
    <StepLabel>Enter your API key</StepLabel>
    <StepContent>
      <TextField id="token" label={`API key for ${platform}`} />
      <Button size="small" variant="raised" color="primary" onClick={next}>Next</Button>
      <Button size="small" variant="raised" onClick={prev}>Back</Button>
    </StepContent>
  </Step>
)

export default AuthenticationStep;
