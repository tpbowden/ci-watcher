import React from "react";

import Button from "material-ui/Button";
import { FormControl, FormControlLabel } from "material-ui/Form";
import Radio, { RadioGroup } from "material-ui/Radio";

import { Platform } from "renderer/platforms";

interface Props {
  options: Platform[];
  value: string;
  onChange(event: React.ChangeEvent<HTMLFormElement>): void;
  onSubmit(): void;
}

const PlatformSelector: React.SFC<Props> = ({
  options,
  onSubmit,
  onChange,
  value
}) => (
  <FormControl>
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
    <Button size="small" variant="raised" color="primary" onClick={onSubmit}>
      Next
    </Button>
  </FormControl>
);

export default PlatformSelector;
