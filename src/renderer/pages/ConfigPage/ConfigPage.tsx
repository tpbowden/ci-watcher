import React from "react";

import Button from "material-ui/Button";
import Stepper, { Step, StepContent, StepLabel } from "material-ui/Stepper";

import platforms, { getPlatform } from "renderer/platforms";

import PlatformSelector from "renderer/PlatformSelector";
import TokenInput from "renderer/TokenInput";
import withConfigHandlers, { ConfigProps } from "./withConfigHandlers";

const ConfigPage: React.SFC<ConfigProps> = ({
  stage,
  back,
  setPlatform,
  token,
  setToken,
  platform
}) => (
  <Stepper activeStep={stage} orientation="vertical">
    <Step>
      <StepLabel>Select a platform</StepLabel>
      <StepContent>
        <PlatformSelector onSubmit={setPlatform} />
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Enter your API key</StepLabel>
      <StepContent>
        <TokenInput platform={platform!} onSubmit={setToken} onCancel={back} />
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Select projects</StepLabel>
      <StepContent>
        <h1>Select projects</h1>
        <Button size="small" variant="raised" onClick={back}>
          Back
        </Button>
      </StepContent>
    </Step>
  </Stepper>
);

export default withConfigHandlers(ConfigPage);
