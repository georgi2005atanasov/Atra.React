/* eslint-disable react/prop-types */
import { Add, X } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { WEIGHT_UNIT_LABELS } from "../../../pages/Details/constants";

const WeightSection = ({
  formData,
  handleWeightChange,
  handleWeightRemove,
  handleWeightAdd,
}) => {
  // Early validation of props
  if (!formData?.detailWeights || !Array.isArray(formData.detailWeights)) {
    return null;
  }

  const onWeightValueChange = (index, value) => {
    const numberValue = value !== "" ? Number(value) : "";
    handleWeightChange(index, "value", numberValue);
  };

  const onWeightUnitChange = (index, value) => {
    handleWeightChange(index, "unit", Number(value));
  };

  return (
    <div className="col-6">
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Тегла на детайл
      </Typography>
      {formData.detailWeights.map((weight, index) => (
        <div key={`weight-${index}`} className="row align-items-end mb-2">
          <div className="col-md-5">
            <TextField
              fullWidth
              label="Тегло"
              type="number"
              value={weight.value ?? ""}
              onChange={(e) => onWeightValueChange(index, e.target.value)}
              color="error"
            />
          </div>
          <div className="col-md-5 mt-md-0 mt-3">
            <FormControl fullWidth color="error">
              <InputLabel>Мерна единица</InputLabel>
              <Select
                value={weight.unit ?? ""}
                label="Мерна единица"
                onChange={(e) => onWeightUnitChange(index, e.target.value)}
              >
                {Object.entries(WEIGHT_UNIT_LABELS).map(([value, label]) => (
                  <MenuItem key={`unit-${value}`} value={Number(value)}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-2 d-flex align-items-center justify-content-center">
            <IconButton
              onClick={() => handleWeightRemove(index)}
              color="error"
              disabled={formData.detailWeights.length <= 1}
            >
              <X />
            </IconButton>
          </div>
        </div>
      ))}
      <Button
        onClick={handleWeightAdd}
        variant="outlined"
        color="error"
        size="small"
        sx={{ mt: 1 }}
        startIcon={<Add />}
      >
        Добави тегло
      </Button>
    </div>
  );
};

export default WeightSection;