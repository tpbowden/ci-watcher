import React from "react";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

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
