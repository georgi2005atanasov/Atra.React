import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const PasswordFieldGA = ({ password, setPassword, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="form-group mb-2">
      <FormControl
        variant="outlined"
        color="error"
        required
        fullWidth
        className="mb-3"
      >
        <InputLabel htmlFor="outlined-adornment-password">Парола</InputLabel>
        <OutlinedInput
          value={password}
          onChange={setPassword}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePasswordVisibility}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="password"
          {...props}
        />
      </FormControl>
    </div>
  );
};

export default PasswordFieldGA;
