/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

const LakiFields = ({ formData, handleChange }) => {
  return (
    <>
      <div className="col-md-6">
        <TextField
          fullWidth
          label="Прес форма"
          name="pressMold"
          value={formData.extraCharacteristics.pressMold}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-md-6">
        <TextField
          fullWidth
          label="Размери Прес форма"
          name="pressMoldDimensions"
          value={formData.extraCharacteristics.pressMoldDimensions}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-md-4">
        <TextField
          fullWidth
          label="Почистване"
          name="cleaning"
          value={formData.extraCharacteristics.cleaning}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-md-4">
        <TextField
          fullWidth
          label="Финишна"
          name="finishing"
          value={formData.extraCharacteristics.finishing}
          onChange={handleChange}
          color="error"
        />
      </div>
      <div className="col-md-4">
        <TextField
          fullWidth
          label="Леярска машина"
          name="castingMachine"
          value={formData.extraCharacteristics.castingMachine}
          onChange={handleChange}
          color="error"
        />
      </div>
      {/* TODO: Remove Weight fields */}
      <div className="col-md-4">
        <TextField
          fullWidth
          label="Грамове"
          name="grams"
          type="number"
          value={formData.extraCharacteristics.grams}
          onChange={handleChange}
          color="error"
        />
      </div>
    </>
  );
};

export default LakiFields;
