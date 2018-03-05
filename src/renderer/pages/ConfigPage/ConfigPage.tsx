import React from "react";

import Button from "material-ui/Button";
import Stepper, { Step, StepContent, StepLabel } from "material-ui/Stepper";
import { compose, withHandlers } from "recompose";

import platforms, { getPlatform } from "renderer/platforms";

import PlatformSelector from "renderer/PlatformSelector";
import TokenInput from "renderer/TokenInput";
import withPlatformHandlers, { PlatformProps } from "./withConfigHandlers";
import withStepNavigation, { NavigationProps } from "./withStepNavigation";

type Props = NavigationProps & PlatformProps;

const ConfigPage: React.SFC<Props> = ({
  stage,
  next,
  prev,
  setPlatform,
  token,
  setToken,
  platform
}) => (
  <Stepper activeStep={stage} orientation="vertical">
    <Step>
      <StepLabel>Select a platform</StepLabel>
      <StepContent>
        <PlatformSelector
          options={platforms}
          value={platform}
          onSubmit={next}
          onChange={setPlatform}
        />
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Enter your API key</StepLabel>
      <StepContent>
        <TokenInput
          token={token}
          onSubmit={next}
          onCancel={prev}
          platform={getPlatform(platform)}
        />
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Select projects</StepLabel>
      <StepContent>
        <h1>Select projects</h1>
        <Button size="small" variant="raised" onClick={prev}>
          Back
        </Button>
      </StepContent>
    </Step>
  </Stepper>
);

const enhance = compose<Props, {}>(withStepNavigation, withPlatformHandlers);

export default enhance(ConfigPage);
