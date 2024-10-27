import { FormControl, InputLabel, Select } from "@mui/material";

// eslint-disable-next-line react/prop-types
const SelectGA = ({ value, setValue, label, id, children }) => {
  return (
    <div className="form-group mb-2">
      <FormControl fullWidth className="mb-2">
        <InputLabel id="demo-simple-select-label" color="error">{label}</InputLabel>
        <Select id={id} value={value} label={label} onChange={setValue} color="error">
          {children}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectGA;
