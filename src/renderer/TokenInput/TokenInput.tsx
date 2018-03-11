import React from "react";

import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
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

export default TokenInput;
