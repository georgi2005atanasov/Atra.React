import { TextField } from "@mui/material";

// eslint-disable-next-line react/prop-types
const FastenerFields = ({din, handleChange}) => {
  return (
    <div className="col-md-6">
      <TextField
        fullWidth
        label="DIN"
        name="din"
        value={din}
        onChange={handleChange}
        required
        color="error"
      />
    </div>
  );
};

export default FastenerFields;
