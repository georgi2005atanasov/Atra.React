import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsApi } from "../../../services/Product/Api";
import { DetailsApi } from "../../../services/Detail/Api";
import { ComponentApi } from "../../../services/Component/Api";
import { useLoading } from "../../../context/LoadingContext";
import { INITIAL_FORM_STATE } from "./constants";

export const useHandlers = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const { setLoading } = useLoading();
  const fileInputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // Search and selection states
  const [detailOptions, setDetailOptions] = useState([]);
  const [componentOptions, setComponentOptions] = useState([]);
  const [loading, setSearchLoading] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [detailPrices, setDetailPrices] = useState([]);

  // Load existing product data if updating
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          setLoading(true);
          const response = await ProductsApi.get().getById(productId);
          setFormData({
            name: response.data.name,
            category: response.data.category,
            labourPrice: response.data.labourPrice,
            detailsPrices: response.data.detailsPrices,
            components: response.data.components,
            image: response.data.image
          });
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [productId]);

  const handleDetailSearch = async (searchTerm) => {
    try {
      setSearchLoading(true);
      const response = await DetailsApi.get().allEssentials({
        page: 1,
        pageSize: 10,
        search: searchTerm
      });
      setDetailOptions(response.data.items);
    } catch (error) {
      console.error("Error searching details:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleComponentSearch = async (searchTerm) => {
    try {
      setSearchLoading(true);
      const response = await ComponentApi.get().allEssentials({
        page: 1,
        pageSize: 10,
        search: searchTerm
      });
      setComponentOptions(response.data.items);
    } catch (error) {
      console.error("Error searching components:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleDetailSelect = async (detail) => {
    if (!detail) return;

    try {
      setSearchLoading(true);
      const response = await DetailsApi.get().getById(detail.id);
      setSelectedDetail(response.data.detail);
      setDetailPrices(response.data.detail.prices);
    } catch (error) {
      console.error("Error fetching detail:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  // Component selection handling
  const handleComponentSelect = (component) => {
    if (!component) return;
    
    const newComponent = {
      id: component.id,
      name: component.name,
      count: 1,
      image: component.image,
      labourPrice: component.labourPrice,
      priceWithoutLabour: component.priceWithoutLabour,
      totalPrice: component.totalPrice
    };

    setFormData(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));
  };

  // Price handlers
  const handleAddPrice = (price) => {
    if (!selectedDetail) return;

    const newPrice = {
      detailName: selectedDetail.name,
      detailId: selectedDetail.id,
      priceId: price.id,
      unit: price.unit,
      price: price.price,
      weight: price.weight,
      count: 1,
      image: selectedDetail.image
    };

    setFormData(prev => ({
      ...prev,
      detailsPrices: [...prev.detailsPrices, newPrice]
    }));
  };

  const isPriceAdded = (price) => {
    return formData.detailsPrices.some(p => p.priceId === price.id);
  };

  const handleDetailCountChange = (index, value) => {
    const newDetailsPrices = [...formData.detailsPrices];
    newDetailsPrices[index].count = Number(value);
    setFormData(prev => ({ ...prev, detailsPrices: newDetailsPrices }));
  };

  const handleComponentCountChange = (index, value) => {
    const newComponents = [...formData.components];
    newComponents[index].count = Number(value);
    setFormData(prev => ({ ...prev, components: newComponents }));
  };

  const handleRemovePrice = (index) => {
    setFormData(prev => ({
      ...prev,
      detailsPrices: prev.detailsPrices.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveComponent = (index) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index)
    }));
  };

  // Image handlers
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Form submission
  const createProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('labourPrice', formData.labourPrice);
      formDataToSend.append('detailsPrices', JSON.stringify(formData.detailsPrices));
      formDataToSend.append('components', JSON.stringify(formData.components));
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

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
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('labourPrice', formData.labourPrice);
      formDataToSend.append('detailsPrices', JSON.stringify(formData.detailsPrices));
      formDataToSend.append('components', JSON.stringify(formData.components));
      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
      }

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
    selectedComponent,
    detailPrices,
    isPriceAdded,
    handleAddPrice,
    handleDetailCountChange,
    handleComponentCountChange,
    handleRemovePrice,
    handleRemoveComponent,
    fileInputRef,
    handleImageUpload,
    handleUploadClick,
    handleRemoveImage,
  };
};