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
import { PRICE_UNIT_LABELS } from "../../../pages/Details/constants";

const PriceSection = ({
  formData,
  handlePriceChange,
  handlePriceRemove,
  handlePriceAdd,
}) => {
  if (!formData?.detailPrices || !Array.isArray(formData.detailPrices)) {
    return null;
  }

  const onPriceValueChange = (index, value) => {
    const numberValue = value !== "" ? Number(value) : null;
    handlePriceChange(index, "value", numberValue);
  };

  const onPriceUnitChange = (index, value) => {
    handlePriceChange(index, "unit", Number(value));
  };

  return (
    <div className="col-6">
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Цени на детайл
      </Typography>
      {formData.detailPrices.map((price, index) => (
        <div key={`price-${index}`} className="row align-items-end mb-2">
          <div className="col-md-5">
            <TextField
              fullWidth
              label="Цена"
              type="number"
              value={price.value ?? ""}
              onChange={(e) => onPriceValueChange(index, e.target.value)}
              color="error"
            />
          </div>
          <div className="col-md-5 mt-md-0 mt-3">
            <FormControl fullWidth color="error">
              <InputLabel>Мерна единица</InputLabel>
              <Select
                value={price.unit ?? ""}
                label="Мерна единица"
                onChange={(e) => onPriceUnitChange(index, e.target.value)}
              >
                {Object.entries(PRICE_UNIT_LABELS).map(([value, label]) => (
                  <MenuItem key={`unit-${value}`} value={Number(value)}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-2 d-flex align-items-center justify-content-center">
            <IconButton
              onClick={() => handlePriceRemove(index)}
              color="error"
              disabled={formData.detailPrices.length <= 1}
            >
              <X />
            </IconButton>
          </div>
        </div>
      ))}
      <Button
        onClick={handlePriceAdd}
        variant="outlined"
        color="error"
        size="small"
        sx={{ mt: 1 }}
        startIcon={<Add />}
      >
        Добави цена
      </Button>
    </div>
  );
};

export default PriceSection;
