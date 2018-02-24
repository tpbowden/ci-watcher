import Button from "material-ui/Button";
import { Step, StepContent, StepLabel } from "material-ui/Stepper";
import { MenuList, MenuItem } from "material-ui/Menu";
import Typography from "material-ui/Typography";
import Radio, { RadioGroup } from "material-ui/Radio";
import {
  FormControl,
  FormHelperText,
  FormControlLabel
} from "material-ui/Form";
import { withHandlers } from "recompose";
import ReportProblemIcon from "material-ui-icons/ReportProblem";

import React from "react";

interface Platform {
  name: string;
}

interface OuterProps {
  options: Platform[];
  value?: string;
  submit(): void;
  change(newValue: string): void;
  error?: string;
}

type InnerProps = OuterProps & Handlers;

const PlatformSelectStep: React.SFC<InnerProps> = ({
  error,
  options,
  value,
  onSubmit,
  onChange,
  ...rest
}) => (
  <Step {...rest}>
    <StepLabel
      icon={error ? <ReportProblemIcon style={{ color: "red" }} /> : 1}
    >
      Select a platform
    </StepLabel>
    <StepContent>
      <FormControl error={Boolean(error)}>
        {error && <FormHelperText>{error}</FormHelperText>}
        <RadioGroup onChange={onChange} value={value}>
          {options.map(p => (
            <FormControlLabel
              key={p.name}
              value={p.name}
              control={<Radio />}
              label={p.name}
            />
          ))}
        </RadioGroup>
        <Button
          size="small"
          variant="raised"
          color="primary"
          onClick={onSubmit}
        >
          Next
        </Button>
      </FormControl>
    </StepContent>
  </Step>
);

interface Handlers {
  onSubmit(): void;
  onChange(e: React.FormEvent<HTMLInputElement>): void;
}

const enhance = withHandlers<OuterProps, Handlers>({
  onSubmit: ({ submit }) => () => submit(),
  onChange: ({ change }) => (e: React.FormEvent<HTMLInputElement>) =>
    change(e.currentTarget.value)
});

export default enhance(PlatformSelectStep);
