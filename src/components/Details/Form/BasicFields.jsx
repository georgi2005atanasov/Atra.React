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
import { Category, CATEGORY_LABELS } from "../../../pages/Details/constants";

const BasicFields = ({
  formData,
  handleChange,
  handleNumberChange,
  suppliers,
  handleSwitchChange,
  handleCategoryChange,
  categories,
  category,
}) => {
  return (
    <>
      {/* Basic Fields */}
      {![
        CATEGORY_LABELS[Category.Glass],
        CATEGORY_LABELS[Category.Metal],
      ].includes(category) && (
        <>
          <div className="col-md-6">
            <TextField
              fullWidth
              label="Име на детайл"
              name="name"
              onChange={handleChange}
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
              color="error"
            />
          </div>
        </>
      )}

      <div className="col-md-6">
        <FormControl fullWidth color="error">
          <InputLabel>Доставчик</InputLabel>
          <Select
            value={formData.supplier}
            label="Доставчик"
            name="supplier"
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

      <div className="col-md-2 d-flex justify-content-center">
        <FormControlLabel
          control={
            <Switch
              color="error"
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
          onChange={handleNumberChange}
          color="error"
        />
      </div>

      <div className="col-12 mb-0">
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
