/* eslint-disable react/prop-types */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const MetalFields = ({
  thickness,
  sizes,
  material,
  materials,
  handleChange,
}) => {
  return (
    <>
      <div className="col-md-6">
        <TextField
          fullWidth
          label="Дебелина (мм)"
          name="thickness"
          type="number"
          value={thickness}
          onChange={(e) =>
            e.target.value !== ""
              ? handleChange(Number(e.target.value))
              : handleChange("")
          }
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
