/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

const MetalFields = ({ thickness, sizes, handleChange }) => {
  return (
    <>
      <div className="col-md-6">
        <TextField
          fullWidth
          label="Дебелина (мм)"
          name="thickness"
          type="number"
          value={thickness}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-md-6">
        <TextField
          fullWidth
          label="Размери"
          name="sizes"
          value={sizes}
          onChange={handleChange}
          color="error"
        />
      </div>
    </>
  );
};

export default MetalFields;
