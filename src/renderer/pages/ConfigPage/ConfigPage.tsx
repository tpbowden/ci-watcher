import React from "react";
import { compose, withHandlers } from "recompose";

import Stepper, { Step, StepContent, StepLabel } from "material-ui/Stepper";

import platforms from "renderer/platforms";

import PlatformSelector from "renderer/PlatformSelector";
import ProjectSelector from "renderer/ProjectSelector";
import TokenInput from "renderer/TokenInput";
import withConfigHandlers, { ConfigProps } from "./withConfigHandlers";

const ConfigPage: React.SFC<ConfigProps & Handlers> = ({
  stage,
  next,
  back,
  setPlatform,
  token,
  submitToken,
  setToken,
  validatingToken,
  tokenErrors,
  platform
}) => (
  <Stepper activeStep={stage} orientation="vertical">
    <Step>
      <StepLabel>Select a platform</StepLabel>
      <StepContent>
        <PlatformSelector
          value={platform.name}
          onChange={setPlatform}
          onSubmit={next}
          options={platforms}
        />
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Enter your API key</StepLabel>
      <StepContent>
        <TokenInput
          platform={platform}
          value={token}
          onChange={setToken}
          onSubmit={submitToken}
          onCancel={back}
          loading={validatingToken}
          errors={tokenErrors}
        />
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Select projects</StepLabel>
      <StepContent>
        <ProjectSelector platform={platform} token={token} />
      </StepContent>
    </Step>
  </Stepper>
);

interface Handlers {
  submitToken(): Promise<void>;
}

export default compose(
  withConfigHandlers,
  withHandlers<ConfigProps, Handlers>({
    submitToken: ({
      token,
      platform,
      next,
      setValidatingState,
      setTokenErrors
    }) => async () => {
      setValidatingState(true);
      setTokenErrors();
      try {
        if (token.length < 1) {
          setTokenErrors("Please enter a token");
          return;
        }

        const valid = await platform!.validateToken(token);
        if (valid) {
          setTokenErrors();
          next();
        } else {
          setTokenErrors("Invalid token");
        }
      } catch (e) {
        setTokenErrors("Request failed, please try again later");
      } finally {
        setValidatingState(false);
      }
    }
  })
)(ConfigPage);
