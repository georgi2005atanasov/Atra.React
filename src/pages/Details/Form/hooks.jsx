// hooks.jsx
import { useRef, useState, useCallback } from "react";
import {
  INITIAL_FORM_STATE,
  CATEGORY_LABELS,
  MATERIAL_LABELS,
  IMAGE_CONFIG,
  PriceUnit,
  getMaterialKeyByValue,
  getCategoryKeyByValue,
} from "./constants";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DetailsApi } from "../../../services/Detail/Api";

export const useHandlers = () => {
  const navigate = useNavigate();
  const {
    category: passedCategory,
    suppliers,
    formData: detailData,
    detailId,
  } = useLoaderData();
  console.log(detailData);
  console.log(detailId);
  const [category, setCategory] = useState(CATEGORY_LABELS[passedCategory]);
  const [formData, setFormData] = useState({
    ...detailData,
    category: category || "",
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name.startsWith("extra.")) {
        const fieldName = name.replace("extra.", "");
        return {
          ...prev,
          extraCharacteristics: {
            ...prev.extraCharacteristics,
            [fieldName]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  }, []);

  const handleExtraChange = useCallback(
    (e) => {
      handleChange({
        ...e,
        target: {
          ...e.target,
          name: `extra.${e.target.name}`,
        },
      });
    },
    [handleChange]
  );

  const handleNumberChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setFormData((prev) => {
        if (
          Object.getOwnPropertyNames(formData.extraCharacteristics).includes(
            name
          )
        ) {
          return {
            ...prev,
            extraCharacteristics: {
              ...prev.extraCharacteristics,
              [name]: value === "" ? "" : Number(value),
            },
          };
        }
        return {
          ...prev,
          [name]: value === "" ? "" : Number(value),
        };
      });
    },
    [formData.extraCharacteristics]
  );

  const validateImage = useCallback((file) => {
    if (file.size > IMAGE_CONFIG.MAX_SIZE) {
      throw new Error(
        `Снимката не трябва да надвишава ${
          IMAGE_CONFIG.MAX_SIZE / 1024 / 1024
        }MB`
      );
    }
    if (!IMAGE_CONFIG.ACCEPTED_TYPES.includes(file.type)) {
      throw new Error("Невалиден формат.");
    }
    return true;
  }, []);

  const handleImageUpload = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        validateImage(file);
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));

        // const reader = new FileReader();
        // reader.onloadend = () => {
        //   setFormData((prev) => ({
        //     ...prev,
        //     image: reader.result,
        //   }));
        // };
        // reader.onerror = () => {
        //   setErrors((prev) => ({
        //     ...prev,
        //     image: "Failed to read image file",
        //   }));
        // };
        // reader.readAsDataURL(file);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          image: error.message,
        }));
      }
    },
    [validateImage]
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.image;
      return newErrors;
    });
  }, []);

  const handleCategoryChange = useCallback((e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setFormData((prev) => {
      const resetState = Object.keys(prev).reduce((acc, key) => {
        if (key in INITIAL_FORM_STATE) {
          acc[key] = INITIAL_FORM_STATE[key];
        }
        return acc;
      }, {});

      return {
        ...resetState,
        ...prev,
        category: newCategory,
      };
    });
  }, []);

  const handleSwitchChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      hasVAT: e.target.checked,
    }));
  }, []);

  // Handler for price/weight/unit changes
  const handlePriceChange = (index, field, value) => {
    const newPrices = [...formData.prices];
    newPrices[index] = {
      ...newPrices[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      prices: newPrices,
    });
  };

  // Handler specifically for metal dimensions
  const handleMetalDimensionsChange = (index, field, value) => {
    const newPrices = [...formData.prices];
    newPrices[index] = {
      ...newPrices[index],
      metalDimensions: {
        ...newPrices[index].metalDimensions,
        [field]: value,
      },
    };
    setFormData({
      ...formData,
      prices: newPrices,
    });
  };

  // Add a new price record
  const handlePriceAdd = () => {
    setFormData({
      ...formData,
      prices: [
        ...formData.prices,
        {
          price: null,
          weight: null,
          unit: PriceUnit.PerOne,
          metalDimensions: {
            thickness: null,
            width: "",
            height: "",
          },
        },
      ],
    });
  };

  // Remove a price record
  const handlePriceRemove = (index) => {
    const newPrices = formData.prices.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      prices: newPrices,
    });
  };

  const createDetail = async (event) => {
    event.preventDefault();

    try {
      await DetailsApi.get().create(
        convertToFormData({
          ...formData,
          // converting to accept enum
          category: getCategoryKeyByValue(formData.category),
          extraCharacteristics: {
            ...formData.extraCharacteristics,
            material: getMaterialKeyByValue(
              formData.extraCharacteristics.material
            ),
          },
          supplierId: suppliers.filter((x) => x.name === formData.supplierName)[0]
            .id,
        })
      );

      navigate("/private/details/all", { replace: true });
    } catch (ex) {
      console.log(ex);
    }
  };

  const updateDetail = async (event) => {
    event.preventDefault();

    try {
      await DetailsApi.get().update(
        detailId,
        convertToFormData({
          ...formData,
          // converting to accept enum
          category: getCategoryKeyByValue(formData.category),
          extraCharacteristics: {
            ...formData.extraCharacteristics,
            material: getMaterialKeyByValue(
              formData.extraCharacteristics.material
            ),
          },
          supplierId: suppliers.filter((x) => x.name === formData.supplierName)[0]
            .id,
        })
      );

      navigate("/private/details/all", { replace: true });
    } catch (ex) {
      console.log(ex);
    }
  };

  return {
    formData,
    category,
    errors,
    fileInputRef,
    handleImageUpload,
    handleUploadClick,
    handleRemoveImage,
    handleChange,
    handleNumberChange,
    handleCategoryChange,
    handleSwitchChange,
    categories: Object.values(CATEGORY_LABELS),
    materials: Object.values(MATERIAL_LABELS),
    suppliers: suppliers,
    createDetail,
    updateDetail,
    detailId,
    handleExtraChange,
    handlePriceAdd,
    handlePriceRemove,
    handlePriceChange,
    handleMetalDimensionsChange,
  };
};

const convertToFormData = (formData) => {
  const form = new FormData();

  form.append("name", formData.name);
  form.append("detailNumber", formData.detailNumber);
  form.append("atraNumber", formData.atraNumber);
  form.append(
    "supplierId",
    formData.supplierId && parseInt(formData.supplierId)
  );
  form.append("description", formData.description || "");
  form.append("hasVAT", formData.hasVAT);
  form.append("category", formData.category);
  formData.labourPrice && form.append("labourPrice", formData.labourPrice);
  form.append("prices", JSON.stringify(formData.prices));
  form.append("detailWeights", JSON.stringify(formData.detailWeights));

  if (formData.image) {
    form.append("image", formData.image);
  }

  form.append(
    "extraCharacteristics",
    JSON.stringify(formData.extraCharacteristics)
  );

  return form;
};
