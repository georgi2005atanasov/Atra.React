/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const AtraFields = ({ formData, materials, handleChange, handleNumberChange }) => {
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
          onChange={handleNumberChange}
          color="error"
        />
      </div>
      <div className="col-md-4">
        <TextField
          fullWidth
          label="Разкрой"
          name="layout"
          type="text"
          value={formData.extraCharacteristics.layout}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-md-3">
        <TextField
          fullWidth
          label="Брой детайли/удар лист"
          name="detailsPerHit"
          type="number"
          value={formData.extraCharacteristics.detailsPerHit}
          onChange={handleNumberChange}
          color="error"
        />
      </div>
      <div className="col-md-3">
        <TextField
          fullWidth
          label="Брой детайли от лист"
          name="detailsPerSheet"
          type="number"
          value={formData.extraCharacteristics.detailsPerSheet}
          onChange={handleNumberChange}
          color="error"
        />
      </div>
    </>
  );
};

export default AtraFields;
