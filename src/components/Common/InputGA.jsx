import { TextField } from "@mui/material";

/* eslint-disable react/prop-types */
const InputGA = ({
  name,
  value,
  setValue,
  placeholder,
  error,
  id,
  type,
  ...props
}) => {
  return (
      <div className="form-group mb-2">
        <TextField
          className="w-100 mb-3 rounded-0 p-0 m-0"
          color="error"
          label={name}
          placeholder={placeholder}
          variant="outlined"
          value={value} // Controlled input value
          onChange={setValue} // Change handler to update state
          error={error}
          type={type}
          id={id}
          {...props}
        />
      </div>
  );
};

export default InputGA;
