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

interface OuterProps {
  next(): void;
}

interface EventHandlers {
  validate(e: React.MouseEvent<HTMLElement>): void;
  onChange(e: React.FormEvent<HTMLInputElement>): void;
}

interface State {
  platform: string;
}

interface Props extends OuterProps, EventHandlers, State {
  setPlatform: StateHandler<State>;
}

interface PlatformList {
  [key: string]: Platform
}

interface Platform {
  name: String;
}

const platforms: PlatformList = {
  circle: { name: "CircleCI"},
  jenkins: {name: "Jenkins"},
  travis: {name: "Travis"},
}

const PlatformSelectStep: React.SFC<Props> = ({ platform, onChange, validate, next, setPlatform, ...rest }) => (
  <Step {...rest}>
    <StepLabel>Select a platform</StepLabel>
    <StepContent>
      <RadioGroup
        onChange={onChange}
        value={platform}
      >
        {
          Object.keys(platforms).map((p) => (
            <FormControlLabel
              key={p}
              value={p}
              control={<Radio />}
              label={platforms[p].name}
            />
          ))
        }
      </RadioGroup>
      <Button size="small" raised color="primary" onClick={validate}>Next</Button>
    </StepContent>
  </Step>
);

const enhance = compose<Props, OuterProps>(
  withState("platform", "setPlatform", ""),
  withHandlers<Props, EventHandlers>({
    validate: (props) => (e: React.MouseEvent<HTMLElement>) => props.next(),
    onChange: (props) => (e: React.FormEvent<HTMLInputElement>) => props.setPlatform(e.currentTarget.value),
  }),
);

export default enhance(PlatformSelectStep);
