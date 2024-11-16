/* eslint-disable react/prop-types */
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
import {
  PRICE_UNIT_LABELS,
  Category,
  CATEGORY_LABELS,
} from "../../../pages/Details/Form/constants";
import { Add, X } from "@mui/icons-material";

const PriceSection = ({
  category,
  formData,
  handlePriceChange,
  handleMetalDimensionsChange,
  handlePriceRemove,
  handlePriceAdd,
  onPriceSelect, // New prop for handling price selection
}) => {
  if (!formData?.prices || !Array.isArray(formData.prices)) {
    return null;
  }

  const isMetal = category === CATEGORY_LABELS[Category.Metal];

  const handlePriceSelect = (index, isSelected) => {
    const selectedPrice = formData.prices[index];
    if (selectedPrice && selectedPrice.id) {
      onPriceSelect(selectedPrice.id, isSelected);
    }
  };

  const onValueChange = (index, field, value) => {
    const numberValue = value !== "" ? Number(value) : null;
    handlePriceChange(index, field, numberValue);
    
    // When price value changes, consider it as selected
    if (field === "price" && numberValue !== null) {
      handlePriceSelect(index, true);
    }
  };

  const onDimensionsChange = (index, field, value) => {
    const numberValue =
      field === "thickness" || field === "width" || field === "height" 
        ? (value !== "" ? Number(value) : null) 
        : value;
    handleMetalDimensionsChange(index, field, numberValue);
  };

  // Enhanced price remove handler to update selection
  const handlePriceRemoveWithSelection = (index) => {
    handlePriceSelect(index, false); // Deselect the price before removing
    handlePriceRemove(index);
  };

  return (
    <div className="col-12">
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Цени и тегла на детайл
      </Typography>

      {formData.prices.map((price, index) => (
        <div key={`price-${index}`} className="row align-items-end mb-2">
          <div className={`col-md-${isMetal ? "2" : "3"} my-1`}>
            <TextField
              fullWidth
              label="Цена (лв.)"
              type="number"
              required={formData.prices.length === 1}
              value={price.price ?? ""}
              onChange={(e) => onValueChange(index, "price", e.target.value)}
              color="error"
              InputProps={{
                readOnly: true, // Make it read-only since data is loaded
              }}
            />
          </div>

          <div className={`col-md-${isMetal ? "2" : "3"} my-1`}>
            <TextField
              fullWidth
              label="Тегло"
              type="number"
              value={price.weight ?? ""}
              onChange={(e) => onValueChange(index, "weight", e.target.value)}
              color="error"
              InputProps={{
                readOnly: true, // Make it read-only since data is loaded
              }}
            />
          </div>

          {isMetal && (
            <>
              <div className="col-md-2 my-1">
                <TextField
                  fullWidth
                  label="Дебелина (мм)"
                  type="number"
                  value={price.metalDimensions?.thickness ?? ""}
                  onChange={(e) =>
                    onDimensionsChange(index, "thickness", e.target.value)
                  }
                  color="error"
                />
              </div>
              <div className="col-md-1 my-1">
                <TextField
                  fullWidth
                  label="Широчина (мм)"
                  value={price.metalDimensions?.width ?? ""}
                  type="number"
                  onChange={(e) =>
                    onDimensionsChange(index, "width", e.target.value)
                  }
                  color="error"
                />
              </div>
              <div className="col-md-1 my-1">
                <TextField
                  fullWidth
                  label="Височина (мм)"
                  value={price.metalDimensions?.height ?? ""}
                  type="number"
                  onChange={(e) =>
                    onDimensionsChange(index, "height", e.target.value)
                  }
                  color="error"
                />
              </div>
            </>
          )}

          <div className={`col-md-${isMetal ? "3" : "4"} my-1`}>
            <FormControl fullWidth color="error">
              <InputLabel>Мерна единица</InputLabel>
              <Select
                value={price.unit ?? ""}
                label="Мерна единица"
                onChange={(e) =>
                  handlePriceChange(index, "unit", Number(e.target.value))
                }
                disabled={true} // Disable since data is loaded
              >
                {Object.entries(PRICE_UNIT_LABELS).map(([value, label]) => (
                  <MenuItem key={`unit-${value}`} value={Number(value)}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="col-md-1 d-flex align-items-center justify-content-center">
            <IconButton
              onClick={() => handlePriceSelect(index, true)}
              color="error"
              sx={{
                backgroundColor: price.selected ? 'rgba(211, 47, 47, 0.1)' : 'transparent',
              }}
            >
              <Add />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PriceSection;