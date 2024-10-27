import {
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

// eslint-disable-next-line react/prop-types
const PasswordFieldGA = ({ password, setPassword, label, ...props }) => {
  return (
    <div className="form-group mb-2">
      <FormControl variant="outlined" color="error" required fullWidth className="mb-3">
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
          value={password}
          onChange={setPassword}
          label={label}
          type="password"
          {...props}
        />
      </FormControl>
    </div>
  );
};

export default PasswordFieldGA;