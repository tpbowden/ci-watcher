import React from "react";
import { compose, StateHandler, withStateHandlers } from "recompose";

import Button from "material-ui/Button";
import { FormControl } from "material-ui/Form";
import { CircularProgress } from "material-ui/Progress";
import { Step, StepContent, StepLabel } from "material-ui/Stepper";
import TextField from "material-ui/TextField";
import { Platform } from "renderer/platforms";

interface Props {
  loading?: boolean;
  platform: Platform;
  value: string;
  onSubmit(): void;
  onCancel(): void;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const TokenInput: React.SFC<Props> = ({
  platform,
  onSubmit,
  onCancel,
  loading,
  value,
  onChange
}) => (
  <div>
    <TextField
      id="token"
      onChange={onChange}
      value={value}
      label={`API key for ${platform.name}`}
    />
    {loading && <CircularProgress size={24} />}
    <Button size="small" variant="raised" color="primary" onClick={onSubmit}>
      Next
    </Button>
    <Button size="small" variant="raised" onClick={onCancel}>
      Back
    </Button>
  </div>
);

interface State {
  token: string;
}

// tslint:disable-next-line: interface-over-type-literal
type Handlers = {
  onChange: StateHandler<State>;
};

interface OuterProps {
  platform: Platform;
  onCancel(): void;
  onSubmit(token: string): void;
}

export default TokenInput;
