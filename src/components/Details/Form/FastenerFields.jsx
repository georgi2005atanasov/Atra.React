/* eslint-disable react/prop-types */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const FastenerFields = ({ din, material, materials, handleChange }) => {
  return (
    <>
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

      <div className="col-md-6">
        <FormControl fullWidth>
          <InputLabel color="error">Материал</InputLabel>
          <Select
            value={!isNaN(material) ? materials[material] : material}
            label="Материал"
            name="material"
            color="error"
            onChange={handleChange}
          >
            {materials.map((material) => (
              <MenuItem key={material} value={material}>
                {material}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default FastenerFields;
