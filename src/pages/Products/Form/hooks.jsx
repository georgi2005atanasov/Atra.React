import { useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ProductsApi } from "../../../services/Product/Api";
import { DetailsApi } from "../../../services/Detail/Api";
import { ComponentApi } from "../../../services/Component/Api";
import { useLoading } from "../../../context/LoadingContext";
import { base64ToFile } from "../../../utils/commonUtils";

export const useHandlers = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const fileInputRef = useRef(null);
  const { formData: passedFormData, productId, category } = useLoaderData();
  const [formData, setFormData] = useState(passedFormData);

  if (category !== undefined)
    formData.category = category;

  // Search and selection states
  const [detailOptions, setDetailOptions] = useState([]);
  const [componentOptions, setComponentOptions] = useState([]);
  const [loading, setSearchLoading] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailPrices, setDetailPrices] = useState([]);

  const createFormData = (data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("category", data.category);
    formDataToSend.append("labourPrice", data.labourPrice || 0);
    formDataToSend.append(
      "detailsPrices",
      JSON.stringify(
        data.detailsPrices.map((x) => ({
          priceId: x.priceId,
          count: x.count,
        }))
      ) || []
    );
    formDataToSend.append(
      "components",
      JSON.stringify(
        data.components.map((x) => ({
          priceId: x.id,
          count: x.count,
        })) || []
      )
    );

    if (formData.image) {
      if (typeof formData.image === "string") {
        formDataToSend.append(
          "image",
          base64ToFile(formData.image, "DEFAULT_IMAGE.png")
        );
      } else {
        formDataToSend.append("image", formData.image);
      }
    }

    return formDataToSend;
  };

  const handleDetailSearch = async (searchTerm) => {
    if (!searchTerm) {
      setDetailOptions([]);
      return;
    }

    try {
      setSearchLoading(true);
      const response = await DetailsApi.get().allEssentials({
        page: 1,
        pageSize: 10,
        search: searchTerm,
      });
      setDetailOptions(response.data.items);
    } catch (error) {
      console.error("Error searching details:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleComponentSearch = async (searchTerm) => {
    if (!searchTerm) {
      setComponentOptions([]);
      return;
    }

    try {
      setSearchLoading(true);
      const response = await ComponentApi.get().allEssentials({
        page: 1,
        pageSize: 10,
        search: searchTerm,
      });
      setComponentOptions(response.data.items);
    } catch (error) {
      console.error("Error searching components:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleDetailSelect = async (detail) => {
    if (!detail) {
      setSelectedDetail(null);
      setDetailPrices([]);
      return;
    }

    try {
      setSearchLoading(true);
      const response = await DetailsApi.get().getById(detail.id);
      const detailData = response.data.detail;
      setSelectedDetail(detailData);
      setDetailPrices(detailData.prices);
    } catch (error) {
      console.error("Error fetching detail:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAddPrice = (price) => {
    if (!selectedDetail) return;

    const newDetailPrice = {
      detailId: selectedDetail.id,
      detailName: selectedDetail.name,
      priceId: price.id,
      price: price.price,
      unit: price.unit,
      weight: price.weight,
      count: 1,
      image: selectedDetail.image,
    };

    setFormData((prev) => ({
      ...prev,
      detailsPrices: [...(prev.detailsPrices || []), newDetailPrice],
    }));
  };

  const isPriceAdded = (price) => {
    return formData.detailsPrices?.some(
      (detail) =>
        detail.priceId === price.id && detail.detailId === selectedDetail?.id
    );
  };

  const handleComponentSelect = (component) => {
    if (!component) return;

    const newComponent = {
      id: component.id,
      name: component.name,
      count: 1,
      image: component.image,
      labourPrice: component.labourPrice,
      priceWithoutLabour: component.priceWithoutLabour,
      totalPrice: component.totalPrice,
    };

    setFormData((prev) => ({
      ...prev,
      components: [...(prev.components || []), newComponent],
    }));
  };

  const handleDetailCountChange = (index, value) => {
    setFormData((prev) => {
      const newDetailsPrices = [...prev.detailsPrices];
      newDetailsPrices[index] = {
        ...newDetailsPrices[index],
        count: value === "" ? "" : Number(value),
      };
      return {
        ...prev,
        detailsPrices: newDetailsPrices,
      };
    });
  };

  const handleComponentCountChange = (index, value) => {
    setFormData((prev) => {
      const newComponents = [...prev.components];
      newComponents[index] = {
        ...newComponents[index],
        count: value === "" ? "" : Number(value),
      };
      return {
        ...prev,
        components: newComponents,
      };
    });
  };

  const handleRemovePrice = (index) => {
    setFormData((prev) => ({
      ...prev,
      detailsPrices: prev.detailsPrices.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveComponent = (index) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index),
    }));
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = createFormData(formData);
      await ProductsApi.get().create(formDataToSend);
      navigate("/private/products/all");
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = createFormData(formData);
      await ProductsApi.get().update(productId, formDataToSend);
      navigate("/private/products/all");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
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
    detailPrices,
    handleDetailCountChange,
    handleComponentCountChange,
    handleRemovePrice,
    handleRemoveComponent,
    fileInputRef,
    handleImageUpload,
    handleUploadClick,
    handleRemoveImage,
    isPriceAdded,
    handleAddPrice,
  };
};
