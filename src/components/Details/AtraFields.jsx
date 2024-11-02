/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const AtraFields = ({ formData, materials, handleChange }) => {
  return (
    <>
      <div className="col-md-6">
        <FormControl fullWidth>
          <InputLabel color="error">Материал</InputLabel>
          <Select
            value={formData.extraCharacteristics.material}
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
      <div className="col-md-6">
        <TextField
          fullWidth
          label="Номер щанца"
          name="dieNumber"
          value={formData.extraCharacteristics.dieNumber}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-md-4">
        <TextField
          fullWidth
          label="Номер огъвач"
          name="benderNumber"
          value={formData.extraCharacteristics.benderNumber}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-md-4">
        <TextField
          fullWidth
          label="Стъпка"
          name="step"
          type="number"
          value={formData.extraCharacteristics.step}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-md-4">
        <TextField
          fullWidth
          label="Разкрой"
          name="cutting"
          type="number"
          value={formData.extraCharacteristics.cutting}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-12">
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Тегла на детайл
        </Typography>

        {/* TODO */}
      </div>
      <div className="col-md-3">
        <TextField
          fullWidth
          label="Тегло-отпадък"
          name="wasteWeight"
          type="number"
          value={formData.extraCharacteristics.wasteWeight}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-md-3">
        <TextField
          fullWidth
          label="Брой детайли/удар лист"
          name="partsPerSheet"
          type="number"
          value={formData.extraCharacteristics.partsPerSheet}
          onChange={handleChange}
          color="error"
        />
      </div>
    </>
  );
};

export default AtraFields;
