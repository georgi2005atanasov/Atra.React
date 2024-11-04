/* eslint-disable react/prop-types */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const MetalFields = ({
  material,
  materials,
  handleChange,
}) => {
  return (
    <>
      <div className="col-md-6">
        <FormControl fullWidth>
          <InputLabel color="error">Материал</InputLabel>
          <Select
            value={material}
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

export default MetalFields;
