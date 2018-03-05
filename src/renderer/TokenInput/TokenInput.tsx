import React from "react";
import { compose } from "recompose";

import Button from "material-ui/Button";
import { Step, StepContent, StepLabel } from "material-ui/Stepper";
import TextField from "material-ui/TextField";
import { Platform } from "renderer/platforms";
import withValidation, { ValidationProps } from "./withValidation";

interface Props {
  platform: Platform;
  token: string;
  onSubmit(): void;
  onCancel(): void;
}

const TokenInput: React.SFC<Props & ValidationProps> = ({
  platform,
  onSubmit,
  onCancel,
  token,
  errors,
  validate
}) => (
  <div>
    {errors && <div>{errors}</div>}
    <TextField id="token" label={`API key for ${platform.name}`} />
    <Button
      size="small"
      variant="raised"
      color="primary"
      onClick={() => validate() && !Boolean(errors) && onSubmit()}
    >
      Next
    </Button>
    <Button size="small" variant="raised" onClick={onCancel}>
      Back
    </Button>
  </div>
);

export default compose<Props, Props>(withValidation)(TokenInput);
