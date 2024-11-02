import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  TextareaAutosize,
  IconButton,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Image, X } from "@mui/icons-material";
import { useHandlers } from "./hooks";
import "./DetailForm.css";

const DetailForm = () => {
  const {
    formData,
    category,
    fileInputRef,
    handleImageUpload,
    handleUploadClick,
    handleRemoveImage,
    handleChange,
    handleCategoryChange,
    handleSwitchChange,
    categories,
    materials,
    suppliersWithAtraNumber,
    suppliers,
    labourFields,
  } = useHandlers();

  return (
    <div className="detail-form-wrapper container mt-4 bg-white">
      <form className="row g-3">
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
            label="Цена"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            color="error"
          />
        </div>

        <div className="col-md-3">
          <TextField
            fullWidth
            label="Номер на детайл"
            name="partNumber"
            value={formData.partNumber}
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

        {suppliersWithAtraNumber.includes(formData.supplier) && (
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
        )}

        {/* Крепежи Fields */}
        {category === "Крепежи" && (
          <div className="col-md-6">
            <TextField
              fullWidth
              label="DIN"
              name="din"
              value={formData.din}
              onChange={handleChange}
              required
              color="error"
            />
          </div>
        )}

        {labourFields.includes(formData.category) && (
          <div className="col-md-4">
            <TextField
              fullWidth
              label="Цена за труд"
              name="laborCost"
              type="number"
              value={formData.laborCost}
              onChange={handleChange}
              color="error"
            />
          </div>
        )}

        <div className="col-12">
          <TextareaAutosize
            minRows={3}
            placeholder="Описание"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
            color="error"
          />
        </div>

        {/* ATPA Fields */}
        {category === "АТРА" && (
          <>
            <div className="col-md-6">
              <FormControl fullWidth>
                <InputLabel color="error">Материал</InputLabel>
                <Select
                  value={formData.material}
                  label="Материал"
                  name="material"
                  color="error"
                  onChange={handleChange}
                >
                  {materials.map((material) => (
                    <MenuItem key={material} value={material}>
                      {material}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                label="Номер щанца"
                name="dieNumber"
                value={formData.dieNumber}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                label="Номер огъвач"
                name="benderNumber"
                value={formData.benderNumber}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                label="Стъпка"
                name="step"
                type="number"
                value={formData.step}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                label="Разкрой"
                name="cutting"
                type="number"
                value={formData.cutting}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-3">
              <TextField
                fullWidth
                label="Тегло"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-3">
              <TextField
                fullWidth
                label="Тегло-отпадък"
                name="wasteWeight"
                type="number"
                value={formData.wasteWeight}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-3">
              <TextField
                fullWidth
                label="Брой детайли от лист"
                name="partsPerSheet"
                type="number"
                value={formData.partsPerSheet}
                onChange={handleChange}
                color="error"
              />
            </div>
          </>
        )}

        {/* LAKI Fields */}
        {category === "ЛАКИ" && (
          <>
            <div className="col-md-6">
              <TextField
                fullWidth
                label="Прес форма"
                name="pressMold"
                value={formData.pressMold}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                label="Размери Прес форма"
                name="pressMoldDimensions"
                value={formData.pressMoldDimensions}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                label="Почистване"
                name="cleaning"
                value={formData.cleaning}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                label="Финишна"
                name="finishing"
                value={formData.finishing}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                label="Леярска машина"
                name="castingMachine"
                value={formData.castingMachine}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                label="Грамове"
                name="grams"
                type="number"
                value={formData.grams}
                onChange={handleChange}
                color="error"
              />
            </div>
          </>
        )}

        {/* Метали Fields */}
        {category === "Метали" && (
          <>
            <div className="col-md-6">
              <TextField
                fullWidth
                label="Дебелина (мм)"
                name="thickness"
                type="number"
                value={formData.thickness}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                label="Размери"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-6">
              <FormControl fullWidth color="error">
                <InputLabel>Материал</InputLabel>
                <Select
                  value={formData.material}
                  label="Материал"
                  name="material"
                  onChange={handleChange}
                >
                  {materials.map((material) => (
                    <MenuItem key={material} value={material}>
                      {material}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                label="Тегло (лист кг.)"
                name="sheetWeight"
                type="number"
                value={formData.sheetWeight}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                label="Тегло (кв.м.)"
                name="weightPerSqm"
                type="number"
                value={formData.weightPerSqm}
                onChange={handleChange}
                color="error"
              />
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                label="Цена/кг"
                name="pricePerKg"
                type="number"
                value={formData.pricePerKg}
                onChange={handleChange}
                color="error"
              />
            </div>
          </>
        )}

        <div className="row">
          <div className="col-6 mt-4">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                  },
                  width: "100%",
                  maxWidth: 500,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
                onClick={handleUploadClick}
              >
                <IconButton
                  color="primary"
                  aria-label="upload image"
                  component="span"
                  sx={{
                    width: 60,
                    height: 60,
                    "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
                  }}
                >
                  <Image size={32} />
                </IconButton>
                <Typography variant="body1" color="textSecondary">
                  Кликнете, за да добавите изображение
                </Typography>
              </Paper>

              {formData.image && (
                <Paper
                  elevation={2}
                  sx={{
                    position: "relative",
                    maxWidth: 500,
                    width: "100%",
                    mt: 2,
                  }}
                >
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      bgcolor: "white",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                      },
                      boxShadow: 1,
                    }}
                    size="small"
                  >
                    <X size={20} />
                  </IconButton>
                  <img
                    src={formData.image}
                    alt="Uploaded preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "300px",
                      objectFit: "contain",
                      borderRadius: 8,
                      display: "block",
                    }}
                  />
                </Paper>
              )}
            </Box>
          </div>
          <div className="col-6 mt-4">
            <Button
              type="submit"
              color="error"
              variant="contained"
              sx={{
                width: "100%",
                minHeight: "140px", // Matches typical image upload area height
                fontSize: "1.25rem",
                textTransform: "none",
              }}
            >
              Създай детайл
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailForm;
