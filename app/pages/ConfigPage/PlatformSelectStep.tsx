import Button from "material-ui/Button";
import {Step, StepContent, StepLabel } from "material-ui/Stepper";
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

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

interface Props extends OuterProps, EventHandlers {
  setPlatform: StateHandler<State>;
}

const PlatformSelectStep: React.SFC<Props> = ({ onChange, validate, next, setPlatform, ...rest }) => (
  <Step {...rest}>
    <StepLabel>Select a platform</StepLabel>
    <StepContent>
      <MenuList>
        <MenuItem>
          <ListItemText inset primary="CircleCI" />
        </MenuItem>
        <MenuItem>
          <ListItemText inset primary="Jenkins" />
        </MenuItem>
        <MenuItem>
          <ListItemText inset primary="Travis" />
        </MenuItem>
    </MenuList>
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
