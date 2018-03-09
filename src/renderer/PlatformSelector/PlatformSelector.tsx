import React from "react";
import {
  compose,
  StateHandler,
  withProps,
  withStateHandlers,
} from "recompose";

import Button from "material-ui/Button";
import { FormControl, FormControlLabel } from "material-ui/Form";
import { MenuItem, MenuList } from "material-ui/Menu";
import Radio, { RadioGroup } from "material-ui/Radio";

import platforms, { getPlatform, Platform } from "renderer/platforms";

export interface InnerProps {
  options: Platform[];
  onSubmit(platform: Platform): void;
}

const PlatformSelector: React.SFC<InnerProps & State & Handlers> = ({
  options,
  onSubmit,
  platform,
  onChange
}) => (
    <FormControl>
      <RadioGroup onChange={onChange} value={platform}>
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
        onClick={() => onSubmit(getPlatform(platform))}
      >
        Next
    </Button>
    </FormControl>
  );

export interface OuterProps {
  onSubmit(platform: Platform): void;
}

// tslint:disable-next-line: interface-over-type-literal
type Handlers = {
  onChange: StateHandler<State>;
};

interface State {
  platform: string;
}

export default compose<InnerProps, OuterProps>(
  withProps({ options: platforms }),
  withStateHandlers<State, Handlers, {}>(
    { platform: platforms[0].name },
    {
      onChange: ({ platform }) => ({
        target: { value }
      }: React.ChangeEvent<HTMLInputElement>) => ({ platform: value })
    }
  )
)(PlatformSelector);
