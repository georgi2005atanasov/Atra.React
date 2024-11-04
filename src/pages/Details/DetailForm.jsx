import { Button } from "@mui/material";
import { useHandlers } from "./hooks";
import BasicFields from "../../components/Details/Form/BasicFields";
import FastenerFields from "../../components/Details/Form/FastenerFields";
import AtraFields from "../../components/Details/Form/AtraFields";
import LakiFields from "../../components/Details/Form/LakiFields";
import MetalFields from "../../components/Details/Form/MetalFields";
import ImageField from "../../components/Details/Form/ImageField";
import { Category, CATEGORY_LABELS } from "./constants";
import GlassFields from "../../components/Details/Form/GlassFields";
import BackButtonGA from "../../components/Common/BackButtonGA";
import { redirect } from "react-router-dom";
import PriceSection from "../../components/Details/Form/PriceSection";
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
    handleNumberChange,
    handleCategoryChange,
    handleSwitchChange,
    categories,
    materials,
    suppliers,
    createDetail,
    handleExtraChange,
    handlePriceAdd,
    handlePriceRemove,
    handlePriceChange,
    handleMetalDimensionsChange,
  } = useHandlers();

  return (
    <div className="detail-form-wrapper container-fluid bg-white p-4 m-3">
      <div className="position-absolute mt-2">
        <BackButtonGA />
      </div>
      <h2 className="text-center my-3 pb-2 border-bottom border-1 border-danger">
        Добави Детайл
      </h2>

      <form
        className="row g-3"
        onSubmit={createDetail}
        encType="multipart/form-data"
      >
        <BasicFields
          formData={formData}
          handleChange={handleChange}
          handleNumberChange={handleNumberChange}
          handleSwitchChange={handleSwitchChange}
          handleCategoryChange={handleCategoryChange}
          suppliers={suppliers}
          categories={categories}
          category={category}
        />

        <PriceSection
          category={category}
          formData={formData}
          handlePriceChange={handlePriceChange}
          handlePriceRemove={handlePriceRemove}
          handlePriceAdd={handlePriceAdd}
          handleMetalDimensionsChange={handleMetalDimensionsChange}
        />

        {/* ATPA Fields */}
        {category === CATEGORY_LABELS[Category.AtraDetail] && (
          <AtraFields
            formData={formData}
            materials={materials}
            handleChange={handleExtraChange}
            handleNumberChange={handleNumberChange}
          />
        )}

        {/* LAKI Fields */}
        {category === CATEGORY_LABELS[Category.LakiDetail] && (
          <LakiFields formData={formData} handleChange={handleExtraChange} />
        )}

        {/* Метали Fields */}
        {category === CATEGORY_LABELS[Category.Metal] && (
          <MetalFields
            material={formData.extraCharacteristics.material}
            materials={materials}
            thicknessValue={formData.extraCharacteristics.thicknessValue}
            sizes={formData.extraCharacteristics.sizes}
            handleNumberChange={handleNumberChange}
            handleChange={handleExtraChange}
          />
        )}

        {/* Крепежи Fields */}
        {category === CATEGORY_LABELS[Category.Fastener] && (
          <FastenerFields
            din={formData.extraCharacteristics.din}
            material={formData.extraCharacteristics.material}
            materials={materials}
            handleChange={handleExtraChange}
          />
        )}

        {/* Стъкло Fields */}
        {category === CATEGORY_LABELS[Category.Glass] && (
          <GlassFields
            material={formData.extraCharacteristics.material}
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

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    return {
      category,
    };
  } catch {
    return redirect("/");
  }
}

export default DetailForm;
