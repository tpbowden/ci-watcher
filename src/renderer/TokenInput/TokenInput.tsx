import React from "react";
import { compose, StateHandler, withStateHandlers } from "recompose";

import Button from "material-ui/Button";
import { Step, StepContent, StepLabel } from "material-ui/Stepper";
import TextField from "material-ui/TextField";
import { Platform } from "renderer/platforms";

interface InnerProps {
  platform: Platform;
  onSubmit(token: string): void;
  onCancel(): void;
}

const TokenInput: React.SFC<InnerProps & State & Handlers> = ({
  platform,
  onSubmit,
  onCancel,
  token,
  onChange
}) => (
    <div>
      <TextField
        id="token"
        onChange={onChange}
        label={`API key for ${platform.name}`}
      />
      <Button
        size="small"
        variant="raised"
        color="primary"
        onClick={() => onSubmit(token)}
      >
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

export default compose<InnerProps, OuterProps>(
  withStateHandlers<State, Handlers, {}>(
    { token: "" },
    {
      onChange: () => ({
        target: { value }
      }: React.ChangeEvent<HTMLInputElement>) => ({ token: value })
    }
  )
)(TokenInput);
