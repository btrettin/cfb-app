import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

type DropdownProps = {
  options: string[];
  value: string;
  label: string;
  onChange: (val: string) => void;
};

export default function Dropdown({
  options,
  value,
  onChange,
  label,
}: DropdownProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="dropdown-label">{label}</InputLabel>
      <Select
        labelId="dropdown-label"
        value={value || ''}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
