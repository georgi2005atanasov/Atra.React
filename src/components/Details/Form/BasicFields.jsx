/* eslint-disable react/prop-types */
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextareaAutosize,
  TextField,
} from "@mui/material";

const BasicFields = ({
  formData,
  handleChange,
  suppliers,
  handleSwitchChange,
  handleCategoryChange,
  categories,
  category,
}) => {
  return (
    <>
      {/* Basic Fields */}
      <div className="col-md-6">
        <TextField
          fullWidth
          label="Име на детайл"
          name="name"
          onChange={handleChange}
          required
          color="error"
        />
      </div>
      <div className="col-md-3">
        <TextField
          fullWidth
          label="Номер на детайл"
          name="detailNumber"
          value={formData.detailNumber}
          onChange={handleChange}
          required
          color="error"
        />
      </div>

      <div className="col-md-6">
        <FormControl fullWidth color="error">
          <InputLabel>Доставчик</InputLabel>
          <Select
            value={formData.supplier}
            label="Доставчик"
            name="supplier"
            required
            onChange={handleChange}
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier} value={supplier}>
                {supplier}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="col-md-6">
        <FormControlLabel
          control={
            <Switch
              checked={formData.hasVAT}
              onChange={handleSwitchChange}
              name="hasVAT"
            />
          }
          label="с VAT"
        />
      </div>

      <div className="col-md-6">
        <FormControl fullWidth color="error">
          <InputLabel>Категория</InputLabel>
          <Select
            value={category}
            label="Категория"
            onChange={handleCategoryChange}
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="col-md-4">
        <TextField
          fullWidth
          label="Номер АТРА"
          name="atraNumber"
          value={formData.atraNumber}
          onChange={handleChange}
          color="error"
        />
      </div>

      <div className="col-md-2">
        <TextField
          fullWidth
          label="Цена за труд"
          name="labourPrice"
          type="number"
          value={formData.labourPrice}
          onChange={(e) =>
            handleChange(e.target.value !== "" ? Number(e.target.value) : null)
          }
          color="error"
        />
      </div>

      <div className="col-12">
        <TextareaAutosize
          minRows={3}
          maxLength={200}
          placeholder="Описание"
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
          color="error"
        />
      </div>
    </>
  );
};

export default BasicFields;
