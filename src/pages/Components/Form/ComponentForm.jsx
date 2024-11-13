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

const ComponentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    labourPrice: "",
    image: null,
    detailPrices: [],
  });

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailOptions, setDetailOptions] = useState([]);
  const [detailPrices, setDetailPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Image handling
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
  const handleDetailSearch = async (searchText) => {
    try {
      setLoading(true);
      const response = await DetailsApi.get().all();
      const data = await response.data.paginatedDetails.items;
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
        // TODO: Implement API call
        const response = await fetch(`/api/details/${detail.id}/prices`);
        const data = await response.json();
        setDetailPrices(data.prices);
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
    setFormData((prev) => ({
      ...prev,
      detailPrices: [
        ...prev.detailPrices,
        {
          detailId: selectedDetail.id,
          detailName: selectedDetail.name,
          price: price.price,
          unit: price.unit,
          quantity: 1,
          supplierName: selectedDetail.supplierName,
          image: selectedDetail.image,
        },
      ],
    }));
  };

  const handleRemovePrice = (index) => {
    setFormData((prev) => ({
      ...prev,
      detailPrices: prev.detailPrices.filter((_, i) => i !== index),
    }));
  };

  const handleQuantityChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      detailPrices: prev.detailPrices.map((price, i) =>
        i === index ? { ...price, quantity: value } : price
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit form:", formData);
  };

  return (
    <form
      className="row g-3"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {/* Basic Fields */}
      <div className="col-md-6">
        <TextField
          fullWidth
          label="Name"
          color="error"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div className="col-md-6">
        <TextField
          fullWidth
          label="Labour Price"
          color="error"
          type="number"
          value={formData.labourPrice}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, labourPrice: e.target.value }))
          }
        />
      </div>

      {/* Detail Search Section */}
      <div className="col-12">
        <Typography variant="h6" className="mb-2">
          Цени за детайли
        </Typography>

        <Autocomplete
          options={detailOptions}
          color="error"
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => handleDetailSelect(value)}
          onInputChange={(_, value) => handleDetailSearch(value)}
          loading={loading}
          renderInput={(params) => (
            <TextField {...params} label="Search Details" fullWidth color="error" />
          )}
          renderOption={(props, option) => (
            <div {...props} className="p-2">
              <div className="d-flex align-items-center">
                {option.image && (
                  <img
                    src={renderBase64Image(option.image)}
                    alt={option.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                      marginRight: "1rem",
                    }}
                  />
                )}
                <div>
                  <div className="fw-bold">{option.name}</div>
                  <div className="text-muted">{option.supplierName}</div>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Available Prices Section */}
      {selectedDetail && (
        <div className="col-12">
          <Paper className="p-3">
            <Typography variant="h6" className="mb-3">
              Налични цени
            </Typography>
            <div className="row g-3">
              {detailPrices.map((price, index) => (
                <div key={index} className="col-md-4">
                  <Paper className="p-3">
                    <Typography variant="h6">
                      {price.price} ({price.unit})
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => handleAddPrice(price)}
                      fullWidth
                      className="mt-2"
                    >
                      Добави цена
                    </Button>
                  </Paper>
                </div>
              ))}
            </div>
          </Paper>
        </div>
      )}

      {/* Selected Prices Section */}
      <div className="col-12">
        <Typography variant="h6" className="mb-3">
          Избрани цени
        </Typography>
        {formData.detailPrices.map((detail, index) => (
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
                <Chip
                  label={`${detail.price} ${detail.unit}`}
                  color="primary"
                  className="mt-2"
                />
              </div>
              <div className="d-flex align-items-center gap-3">
                <TextField
                  type="number"
                  label="Quantity"
                  value={detail.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  style={{ width: "100px" }}
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

      {/* Image and Submit Section */}
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
