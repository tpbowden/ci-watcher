import React from "react";
import { compose, withHandlers } from 'recompose';

import Button from "material-ui/Button";
import Stepper, { Step, StepContent, StepLabel } from "material-ui/Stepper";

import platforms, { getPlatform } from "renderer/platforms";

import PlatformSelector from "renderer/PlatformSelector";
import TokenInput from "renderer/TokenInput";
import withConfigHandlers, { ConfigProps } from "./withConfigHandlers";

const ConfigPage: React.SFC<ConfigProps & Handlers> = ({
  stage,
  back,
  setPlatform,
  token,
  onSubmitToken,
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
          <TokenInput platform={platform!} onSubmit={onSubmitToken} onCancel={back} />
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

interface Handlers {
  onSubmitToken(token: string): Promise<boolean>;
}

export default compose(
  withConfigHandlers,
  withHandlers<ConfigProps, Handlers>({
    onSubmitToken: ({ setToken, platform }) => async (token: string) => {
      try {
        const valid = await platform!.validateToken(token);
        if (valid) {
          setToken(token);
        } else {
          console.log("nah mate");
        }
      } catch (e) {
        console.log("failure");
      }
    }
  })
)(ConfigPage);
