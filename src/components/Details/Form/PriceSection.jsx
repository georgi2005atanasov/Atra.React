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
} from "../../../pages/Details/constants";
import { Add, X } from "@mui/icons-material";

const PriceSection = ({
  category,
  formData,
  handlePriceChange,
  handleMetalDimensionsChange,
  handlePriceRemove,
  handlePriceAdd,
}) => {
  if (!formData?.prices || !Array.isArray(formData.prices)) {
    return null;
  }

  const isMetal = category === CATEGORY_LABELS[Category.Metal];

  const onValueChange = (index, field, value) => {
    const numberValue = value !== "" ? Number(value) : null;
    handlePriceChange(index, field, numberValue);
  };

  const onDimensionsChange = (index, field, value) => {
    const numberValue =
      field === "thickness" ? (value !== "" ? Number(value) : null) : value;
    handleMetalDimensionsChange(index, field, numberValue);
  };

  return (
    <div className="col-12">
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Цени и тегла на детайл
      </Typography>

      {formData.prices.map((price, index) => (
        <div key={`price-${index}`} className="row align-items-end mb-2">
          <div className={`col-md-${isMetal ? "2" : "3"}`}>
            <TextField
              fullWidth
              label="Цена"
              type="number"
              value={price.price ?? ""}
              onChange={(e) => onValueChange(index, "price", e.target.value)}
              color="error"
            />
          </div>

          <div className={`col-md-${isMetal ? "2" : "3"}`}>
            <TextField
              fullWidth
              label="Тегло"
              type="number"
              value={price.weight ?? ""}
              onChange={(e) => onValueChange(index, "weight", e.target.value)}
              color="error"
            />
          </div>

          {isMetal && (
            <>
              <div className="col-md-2">
                <TextField
                  fullWidth
                  label="Дебелина"
                  type="number"
                  value={price.metalDimensions?.thickness ?? ""}
                  required
                  onChange={(e) =>
                    onDimensionsChange(index, "thickness", e.target.value)
                  }
                  color="error"
                />
              </div>
              <div className="col-md-2">
                <TextField
                  fullWidth
                  label="Размери"
                  value={price.metalDimensions?.sizes ?? ""}
                  required
                  onChange={(e) =>
                    onDimensionsChange(index, "sizes", e.target.value)
                  }
                  color="error"
                />
              </div>
            </>
          )}

          <div className={`col-md-${isMetal ? "3" : "4"}`}>
            <FormControl fullWidth color="error">
              <InputLabel>Мерна единица</InputLabel>
              <Select
                value={price.unit ?? ""}
                label="Мерна единица"
                onChange={(e) =>
                  handlePriceChange(index, "unit", Number(e.target.value))
                }
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
              onClick={() => handlePriceRemove(index)}
              color="error"
              disabled={formData.prices.length <= 1}
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
        Добави цена и тегло
      </Button>
    </div>
  );
};

export default PriceSection;
