import Button from "material-ui/Button";
import {Step, StepContent, StepLabel } from "material-ui/Stepper";
import { MenuList, MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

import React from "react";
import {
  compose,
  withHandlers,
  withState,
  StateHandler,
} from "recompose";

interface Platform {
  name: string;
}

interface Props {
  options: Platform[];
  value?: string;
  onSubmit(): void;
  onChange(e: React.FormEvent<HTMLInputElement>): void;
}

const PlatformSelectStep: React.SFC<Props> = ({ options, value, onSubmit, onChange, ...rest}) => (
  <Step {...rest}>
    <StepLabel>Select a platform</StepLabel>
    <StepContent>
      <RadioGroup onChange={onChange} value={value}> {
          options.map((p) => (
            <FormControlLabel
              key={p.name}
              value={p.name}
              control={<Radio />}
              label={p.name}
            />
          ))
        }
      </RadioGroup>
      <Button size="small" variant="raised" color="primary" onClick={onSubmit}>Next</Button>
    </StepContent>
  </Step>
);

export default PlatformSelectStep;
