// hooks.jsx
import { useRef, useState, useCallback } from 'react';
import { 
  INITIAL_FORM_STATE, 
  CATEGORIES,
  MATERIALS,
  SUPPLIERS,
  IMAGE_CONFIG,
} from './constants';

export const useHandlers = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validateImage = useCallback((file) => {
    if (file.size > IMAGE_CONFIG.MAX_SIZE) {
      throw new Error(`Снимката не трябва да надвишава ${IMAGE_CONFIG.MAX_SIZE / 1024 / 1024}MB`);
    }
    if (!IMAGE_CONFIG.ACCEPTED_TYPES.includes(file.type)) {
      throw new Error('Невалиден формат.');
    }
    return true;
  }, []);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      validateImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.onerror = () => {
        setErrors(prev => ({
          ...prev,
          image: 'Failed to read image file'
        }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        image: error.message
      }));
    }
  }, [validateImage]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      image: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.image;
      return newErrors;
    });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name.startsWith('extra.')) {
        const fieldName = name.replace('extra.', '');
        return {
          ...prev,
          extraCharacteristics: {
            ...prev.extraCharacteristics,
            [fieldName]: value
          }
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  }, []);

  const handleCategoryChange = useCallback((e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setFormData(prev => {
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
    setFormData(prev => ({
      ...prev,
      hasVAT: e.target.checked,
    }));
  }, []);

  const createDetail = (event) => {
    event.preventDefault();
    console.log(formData);
  }

  return {
    formData,
    category,
    errors,
    fileInputRef,
    handleImageUpload,
    handleUploadClick,
    handleRemoveImage,
    handleChange,
    handleCategoryChange,
    handleSwitchChange,
    categories: Object.values(CATEGORIES),
    materials: Object.values(MATERIALS),
    suppliers: Object.values(SUPPLIERS),
    createDetail,
  };
};