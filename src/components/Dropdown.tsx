import React from 'react';
import debounce from 'lodash.debounce';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

type DropdownProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: (val: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const handleChange = debounce((event: SelectChangeEvent) => {
    setSelectedOption(event.target.value as string);
  }, 300); // Adjust the delay to your needs

  return (
    <FormControl fullWidth>
      <InputLabel id="dropdown-label">Select an option</InputLabel>
      <Select
        labelId="dropdown-label"
        value={selectedOption || ''}
        onChange={handleChange}
        displayEmpty
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
};

export default Dropdown;
