import { Typography, Button } from "@mui/material";
import { useHandlers } from "./hooks";
import BasicFields from "../../components/Details/BasicFields";
import FastenerFields from "../../components/Details/FastenerFields";
import AtraFields from "../../components/Details/AtraFields";
import LakiFields from "../../components/Details/LakiFields";
import MetalFields from "../../components/Details/MetalFields";
import ImageField from "../../components/Details/ImageField";
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
    suppliers,
    createDetail,
  } = useHandlers();

  const handleExtraChange = (e) => {
    handleChange({
      ...e,
      target: {
        ...e.target,
        name: `extra.${e.target.name}`,
      },
    });
  };

  return (
    <div className="detail-form-wrapper container mt-4 bg-white">
      <form
        className="row g-3"
        onSubmit={createDetail}
        encType="multipart/form-data"
      >
        <BasicFields
          formData={formData}
          handleChange={handleChange}
          suppliers={suppliers}
          handleSwitchChange={handleSwitchChange}
          handleCategoryChange={handleCategoryChange}
          categories={categories}
          category={category}
        />

        {category === "Крепежи" && (
          <FastenerFields
            din={formData.extraCharacteristics.din}
            handleChange={handleExtraChange}
          />
        )}

        <div className="col-12">
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Цени на детайл
          </Typography>
          {/* TODO */}
          {/* Price - Price unit */}
        </div>

        {/* ATPA Fields */}
        {category === "АТРА" && (
          <AtraFields
            formData={formData}
            materials={materials}
            handleChange={handleExtraChange}
          />
        )}

        {/* LAKI Fields */}
        {category === "ЛАКИ" && (
          <LakiFields formData={formData} handleChange={handleExtraChange} />
        )}

        {/* Метали Fields */}
        {category === "Метали" && (
          <MetalFields
            formData={formData}
            materials={materials}
            handleChange={handleExtraChange}
          />
        )}

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
              Създай детайл
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailForm;
