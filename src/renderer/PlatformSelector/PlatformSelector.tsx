import React from "react";

import Button from "material-ui/Button";
import { FormControl, FormControlLabel } from "material-ui/Form";
import { MenuItem, MenuList } from "material-ui/Menu";
import Radio, { RadioGroup } from "material-ui/Radio";

import { Platform } from "renderer/platforms";

export interface PlatformSelectorProps {
  options: Platform[];
  value: string;
  onSubmit(): void;
  onChange(event: React.FormEvent<HTMLInputElement>): void;
}

const PlatformSelector: React.SFC<PlatformSelectorProps> = ({
  options,
  value,
  onSubmit,
  onChange
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
