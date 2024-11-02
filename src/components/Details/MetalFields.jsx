/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const MetalFields = ({ formData, materials, handleChange }) => {
  return (
    <>
    <div className="col-md-6">
      <TextField
        fullWidth
        label="Дебелина (мм)"
        name="thickness"
        type="number"
        value={formData.extraCharacteristics.thickness}
        onChange={handleChange}
        color="error"
      />
    </div>
    <div className="col-md-6">
      <TextField
        fullWidth
        label="Размери"
        name="dimensions"
        value={formData.extraCharacteristics.dimensions}
        onChange={handleChange}
        color="error"
      />
    </div>
    <div className="col-md-6">
      <FormControl fullWidth color="error">
        <InputLabel>Материал</InputLabel>
        <Select
          value={formData.extraCharacteristics.material}
          label="Материал"
          name="material"
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
    {/* TODO: Remove weight/price fields; make them generic */}
    <div className="col-md-6">
      <TextField
        fullWidth
        label="Тегло (лист кг.)"
        name="sheetWeight"
        type="number"
        value={formData.extraCharacteristics.sheetWeight}
        onChange={handleChange}
        color="error"
      />
    </div>
    <div className="col-md-4">
      <TextField
        fullWidth
        label="Тегло (кв.м.)"
        name="weightPerSqm"
        type="number"
        value={formData.extraCharacteristics.weightPerSqm}
        onChange={handleChange}
        color="error"
      />
    </div>
    <div className="col-md-4">
      <TextField
        fullWidth
        label="Цена/кг"
        name="pricePerKg"
        type="number"
        value={formData.extraCharacteristics.pricePerKg}
        onChange={handleChange}
        color="error"
      />
    </div>
  </>
  );
};

export default MetalFields;
