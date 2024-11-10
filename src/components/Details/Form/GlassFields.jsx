/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const GlassFields = ({ material, materials, handleChange }) => {
  return (
    <>
      <div className="col-md-6">
        <FormControl fullWidth required>
          <InputLabel color="error" required>Материал</InputLabel>
          <Select
            value={!isNaN(material) ? materials[material] : material}
            label="Материал"
            name="material"
            color="error"
            onChange={handleChange}
            required
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

export default GlassFields;
