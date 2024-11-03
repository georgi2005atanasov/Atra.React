/* eslint-disable react/prop-types */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const MetalFields = ({
  thicknessValue,
  sizes,
  material,
  materials,
  handleChange,
  handleNumberChange,
}) => {
  return (
    <>
      <div className="col-md-6">
        <TextField
          fullWidth
          label="Дебелина (мм)"
          name="thicknessValue"
          type="number"
          value={thicknessValue}
          onChange={handleNumberChange}
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
