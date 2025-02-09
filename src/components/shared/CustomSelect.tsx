import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = React.memo(
  ({ label, value, onChange, options }) => {
    const handleChange = (event: SelectChangeEvent) => {
      onChange(event.target.value);
    };

    return (
      <FormControl
        variant="outlined"
        size="small"
        sx={{ minWidth: 120, borderRadius: "15px" }}
      >
        <InputLabel sx={{ fontSize: "14px" }}>{label}</InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          label={label}
          sx={{ borderRadius: "25px" }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);

export default CustomSelect;
