import React from "react";

import ReportProblemIcon from "material-ui-icons/ReportProblem";
import Button from "material-ui/Button";
import {
  FormControl,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";
import { MenuItem, MenuList } from "material-ui/Menu";
import Radio, { RadioGroup } from "material-ui/Radio";
import { Step, StepContent, StepLabel } from "material-ui/Stepper";
import Typography from "material-ui/Typography";
import { withHandlers } from "recompose";

interface Platform {
  name: string;
}

interface OuterProps {
  error?: string;
  options: Platform[];
  value?: string;
  submit(): void;
  change(newValue: string): void;
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
          {options.map((p) => (
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
  onChange: ({ change }) => (e: React.FormEvent<HTMLInputElement>) =>
    change(e.currentTarget.value),
  onSubmit: ({ submit }) => () => submit()
});

export default enhance(PlatformSelectStep);
