import { useRef, useState } from "react";
import { ComponentApi } from "../../../services/Component/Api";
import { DetailsApi } from "../../../services/Detail/Api";
import { base64ToFile } from "../../../utils/commonUtils";
import { useLoaderData, useNavigate } from "react-router-dom";

export const useHandlers = () => {
  const navigate = useNavigate();
  const { componentId, formData: passedFormData } = useLoaderData();
  const [formData, setFormData] = useState(passedFormData);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailOptions, setDetailOptions] = useState([]);
  const [detailPrices, setDetailPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const isPriceAdded = (price) => {
    return formData.detailsPrices.some(
      (detailPrice) => detailPrice.priceId === price.id // Only check the price ID since it's unique
    );
  };

  const handleCountChange = (index, value) => {
    if (value === "" || Number(value) > 0) {
      setFormData((prev) => ({
        ...prev,
        detailsPrices: prev.detailsPrices.map((price, i) =>
          i === index
            ? {
                ...price,
                count: value === "" ? "" : Number(value), // Keep empty string or convert to number
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
            priceId: price.id,
            detailName: selectedDetail.name,
            price: price.price,
            unit: price.unit,
            weight: price.weight || 0,
            count: 1,
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

  const createComponent = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      await ComponentApi.get().create(
        convertToFormData({
          ...formData,
          detailsPrices: formData.detailsPrices.map((x) => ({
            priceId: x.priceId,
            count: x.count,
          })),
        })
      );

      navigate("/private/components/all", { replace: true });
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  const updateComponent = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      await ComponentApi.get().update(
        componentId,
        convertToFormData({
          ...formData,
          detailsPrices: formData.detailsPrices.map((x) => ({
            priceId: x.priceId,
            count: x.count,
          })),
        })
      );

      navigate("/private/components/all", { replace: true });
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  return {
    createComponent,
    updateComponent,
    componentId,
    formData,
    setFormData,
    detailOptions,
    handleDetailSelect,
    handleDetailSearch,
    loading,
    selectedDetail,
    detailPrices,
    isPriceAdded,
    handleAddPrice,
    handleCountChange,
    handleRemovePrice,
    fileInputRef,
    handleImageUpload,
    handleUploadClick,
    handleRemoveImage,
  };
};

export const convertToFormData = (formData) => {
  const form = new FormData();

  form.append("name", formData.name);
  form.append("detailsPrices", JSON.stringify(formData.detailsPrices));
  if (formData.image) {
    if (typeof formData.image === "string") {
      form.append("image", base64ToFile(formData.image, "DEFAULT_IMAGE.png"));
    } else {
      form.append("image", formData.image);
    }
  }
  if (formData.labourPrice !== null && formData.labourPrice !== "")
    form.append("labourPrice", formData.labourPrice);

  return form;
};
