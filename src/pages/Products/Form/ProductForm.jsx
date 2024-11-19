import {
  TextField,
  Typography,
  Paper,
  Autocomplete,
  IconButton,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { renderBase64Image } from "../../../utils/renderers";
import { PRODUCT_CATEGORY_LABELS } from "./constants";
import { PRICE_UNIT_LABELS } from "../../Details/Form/constants";
import ImageField from "../../../components/Common/ImageField";
import { useHandlers } from "./hooks";

const ProductForm = () => {
  const {
    createProduct,
    updateProduct,
    productId,
    formData,
    setFormData,
    detailOptions,
    componentOptions,
    handleDetailSelect,
    handleComponentSelect,
    handleDetailSearch,
    handleComponentSearch,
    loading,
    selectedDetail,
    selectedComponent,
    detailPrices,
    isPriceAdded,
    handleAddPrice,
    handleAddComponent,
    handleDetailCountChange,
    handleComponentCountChange,
    handleRemovePrice,
    handleRemoveComponent,
    fileInputRef,
    handleImageUpload,
    handleUploadClick,
    handleRemoveImage,
  } = useHandlers();

  return (
    <form
      className="row g-3"
      onSubmit={productId === undefined ? createProduct : updateProduct}
      encType="multipart/form-data"
    >
      {/* Basic Fields */}
      <div className="col-md-3">
        <TextField
          fullWidth
          label="Име"
          color="error"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div className="col-md-2">
        <FormControl fullWidth color="error">
          <InputLabel>Категория</InputLabel>
          <Select
            value={formData.category}
            label="Категория"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            required
          >
            {Object.entries(PRODUCT_CATEGORY_LABELS).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="col-md-1">
        <TextField
          fullWidth
          label="Цена за труд (лв.)"
          color="error"
          type="number"
          value={formData.labourPrice}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              labourPrice: e.target.value !== "" ? Number(e.target.value) : "",
            }))
          }
        />
      </div>

      {/* Detail Search Section */}
      <div className="col-md-6">
        <Autocomplete
          options={detailOptions}
          color="error"
          getOptionLabel={(option) => option.name || option.supplierName || "-"}
          onChange={(_, value) => handleDetailSelect(value)}
          onInputChange={(_, value) => handleDetailSearch(value)}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Търси детайли"
              fullWidth
              color="error"
            />
          )}
          renderOption={(props, option) => (
            <div {...props} className="p-0">
              <div
                className="d-flex align-items-center border-bottom border-light hover-bg-light"
                style={{ height: "80px", padding: "8px 16px" }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ width: "80px" }}
                >
                  {option.image ? (
                    <img
                      src={renderBase64Image(option.image)}
                      alt={option.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center bg-light rounded"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <span className="text-muted">X</span>
                    </div>
                  )}
                </div>
                <div className="ms-3">
                  <div className="fw-bold">{option.name}</div>
                  <div className="text-muted">{option.supplierName}</div>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Component Search Section */}
      <div className="col-md-12">
        <Autocomplete
          options={componentOptions}
          color="error"
          getOptionLabel={(option) => option.name || "-"}
          onChange={(_, value) => handleComponentSelect(value)}
          onInputChange={(_, value) => handleComponentSearch(value)}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Търси компоненти"
              fullWidth
              color="error"
            />
          )}
          renderOption={(props, option) => (
            <div {...props} className="p-0">
              <div
                className="d-flex align-items-center border-bottom border-light hover-bg-light"
                style={{ height: "80px", padding: "8px 16px" }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ width: "80px" }}
                >
                  {option.image ? (
                    <img
                      src={renderBase64Image(option.image)}
                      alt={option.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center bg-light rounded"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <span className="text-muted">X</span>
                    </div>
                  )}
                </div>
                <div className="ms-3">
                  <div className="fw-bold">{option.name}</div>
                  <div className="text-muted">
                    Цена: {option.totalPrice?.toFixed(2)} лв.
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Selected Details Section */}
      <div className="col-12">
        <Typography variant="h6" className="mb-3">
          Избрани детайли
        </Typography>
        {formData.detailsPrices?.map((detail, index) => (
          <Paper key={index} className="p-3 mb-3">
            <div className="d-flex align-items-center">
              {detail.image && (
                <div style={{ width: "100px", marginRight: "1rem" }}>
                  <img
                    src={renderBase64Image(detail.image)}
                    alt={detail.detailName}
                    className="img-fluid"
                  />
                </div>
              )}
              <div className="flex-grow-1">
                <Typography variant="subtitle1">{detail.detailName}</Typography>
                <div className="d-flex gap-2 mt-2">
                  <Chip
                    label={`${detail.price}лв. / ${
                      PRICE_UNIT_LABELS[detail.unit] || ""
                    }`}
                    color="error"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <TextField
                  type="number"
                  label="Брой"
                  value={detail.count}
                  onChange={(e) =>
                    handleDetailCountChange(index, e.target.value)
                  }
                  style={{ width: "100px" }}
                  color="error"
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemovePrice(index)}
                >
                  <Delete />
                </IconButton>
              </div>
            </div>
          </Paper>
        ))}
      </div>

      {/* Selected Components Section */}
      <div className="col-12">
        <Typography variant="h6" className="mb-3">
          Избрани компоненти
        </Typography>
        {formData.components?.map((component, index) => (
          <Paper key={index} className="p-3 mb-3">
            <div className="d-flex align-items-center">
              {component.image && (
                <div style={{ width: "100px", marginRight: "1rem" }}>
                  <img
                    src={renderBase64Image(component.image)}
                    alt={component.name}
                    className="img-fluid"
                  />
                </div>
              )}
              <div className="flex-grow-1">
                <Typography variant="subtitle1">{component.name}</Typography>
                <div className="d-flex gap-2 mt-2">
                  <Chip
                    label={`${component.totalPrice?.toFixed(2)}лв.`}
                    color="error"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <TextField
                  type="number"
                  label="Брой"
                  value={component.count}
                  onChange={(e) =>
                    handleComponentCountChange(index, e.target.value)
                  }
                  style={{ width: "100px" }}
                  color="error"
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveComponent(index)}
                >
                  <Delete />
                </IconButton>
              </div>
            </div>
          </Paper>
        ))}
      </div>

      <div className="row">
        <ImageField
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
          handleUploadClick={handleUploadClick}
          handleRemoveImage={handleRemoveImage}
          formData={formData}
        />

        <div className="col-6 mt-4">
          <Button
            type="submit"
            color="error"
            variant="contained"
            sx={{
              width: "100%",
              minHeight: "140px",
              fontSize: "1.25rem",
              textTransform: "none",
            }}
          >
            {productId === undefined ? "Създай продукт" : "Обнови продукт"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
