import { useState, useRef } from "react";
import {
  TextField,
  Typography,
  Paper,
  Autocomplete,
  IconButton,
  Chip,
  Button,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { renderBase64Image } from "../../../utils/renderers";
import ImageField from "../../../components/Common/ImageField";
import { DetailsApi } from "../../../services/Detail/Api";
import { PRICE_UNIT_LABELS } from "../../Details/Form/constants";
import { convertToFormData } from "./hooks";
import { ComponentApi } from "../../../services/Component/Api";

const ComponentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    labourPrice: null,
    image: null,
    detailsPrices: [],
  });

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailOptions, setDetailOptions] = useState([]);
  const [detailPrices, setDetailPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  console.log(detailPrices);

  const isPriceAdded = (price) => {
    return formData.detailsPrices.some(
      (detailPrice) => detailPrice.id === price.id // Only check the price ID since it's unique
    );
  };

  const handleQuantityChange = (index, value) => {
    if (value === "" || Number(value) > 0) {
      setFormData((prev) => ({
        ...prev,
        detailsPrices: prev.detailsPrices.map((price, i) =>
          i === index
            ? {
                ...price,
                quantity: value === "" ? "" : Number(value), // Keep empty string or convert to number
              }
            : price
        ),
      }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
  };

  // Detail search and price handling
  const handleDetailSearch = async (search) => {
    try {
      setLoading(true);
      const response = await DetailsApi.get().allEssentials(search);
      const data = await response.data.items;
      setDetailOptions(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailSelect = async (detail) => {
    setSelectedDetail(detail);
    if (detail) {
      try {
        setLoading(true);
        const response = await DetailsApi.get().getPricesById(detail.id);
        setDetailPrices(response.data.prices);
      } catch (error) {
        console.error("Error fetching detail prices:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setDetailPrices([]);
    }
  };

  const handleAddPrice = (price) => {
    if (!isPriceAdded(price)) {
      setFormData((prev) => ({
        ...prev,
        detailsPrices: [
          ...prev.detailsPrices,
          {
            id: price.id,
            detailName: selectedDetail.name,
            price: price.price,
            unit: price.unit,
            weight: price.weight || 0,
            quantity: 1,
            supplierName: selectedDetail.supplierName,
            image: selectedDetail.image,
          },
        ],
      }));
    }
  };

  const handleRemovePrice = (index) => {
    setFormData((prev) => ({
      ...prev,
      detailsPrices: prev.detailsPrices.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const r = await ComponentApi.get().create(convertToFormData(formData));
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <form
      className="row g-3"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {/* Basic Fields */}
      <div className="col-md-3">
        <TextField
          fullWidth
          label="Име"
          color="error"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
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
      <div className="col-md-8">
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
            <div
              {...props}
              className="p-0" // Remove default padding
            >
              <div
                className="d-flex align-items-center border-bottom border-light hover-bg-light"
                style={{
                  height: "80px", // Fixed height for consistency
                  padding: "8px 16px",
                  transition: "background-color 0.2s ease",
                }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ width: "80px", height: "100%" }}
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
                      style={{
                        width: "60px",
                        height: "60px",
                      }}
                    >
                      <span className="text-muted">X</span>
                    </div>
                  )}
                </div>
                <div className="ms-3 d-flex flex-column justify-content-center overflow-hidden">
                  <div
                    className="fw-bold text-truncate"
                    style={{
                      maxWidth: "400px",
                      fontSize: "1rem",
                      lineHeight: "1.2",
                    }}
                  >
                    {option.name}
                  </div>
                  <div
                    className="text-muted text-truncate"
                    style={{
                      maxWidth: "400px",
                      fontSize: "0.875rem",
                      marginTop: "4px",
                    }}
                  >
                    {option.supplierName}
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Available Prices Section */}
      {selectedDetail && (
        <div className="col-12">
          <Paper className="p-3 mt-2">
            <Typography variant="h6" className="mb-3 d-flex">
              Налични цени
            </Typography>
            <div className="row g-3">
              {detailPrices &&
                detailPrices.map((price, index) => {
                  const isAdded = isPriceAdded(price);
                  return (
                    <div key={index} className="col-md-4">
                      <Paper className="p-3">
                        <div className="d-flex flex-column gap-2">
                          <Typography variant="h6" color="error">
                            {price.price} лв. / {price.unit}
                          </Typography>
                          {price.weight && (
                            <Typography variant="body2" color="text.secondary">
                              Тегло: {price.weight}г
                            </Typography>
                          )}
                        </div>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Add />}
                          onClick={() => handleAddPrice(price)}
                          fullWidth
                          className="mt-2"
                          disabled={isAdded}
                          sx={{ opacity: isAdded ? 0.5 : 1 }}
                        >
                          {isAdded ? "Вече е добавено" : "Добави цена"}
                        </Button>
                      </Paper>
                    </div>
                  );
                })}
            </div>
          </Paper>
        </div>
      )}

      {/* Selected Prices Section */}
      <div className="col-12">
        <Typography variant="h6" className="mb-3">
          Избрани цени
        </Typography>
        {formData.detailsPrices.map((detail, index) => (
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
                <Typography variant="body2" color="text.secondary">
                  {detail.supplierName}
                </Typography>
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
                  label="Quantity"
                  value={detail.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
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
            Създай компонент
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ComponentForm;
