import { useRef, useState } from "react";

export const useHandlers = () => {
  const categories = [
    "Стъкла",
    "Метали",
    "Крепежи",
    "Проводници, клеми, накрайници",
    "АТРА",
    "ЛАКИ",
    "Други",
  ];

  const materials = [
    "Алуминий",
    "Стомана",
    "Мед",
    "Месинг",
    "Пластмаса",
    "Други",
  ];

  // TODO: Get the suppliers from the db
  const suppliersWithAtraNumber = [
    "DIKO",
    "АЛУКОМ Плевен",
    "Ангел Попов",
    "ЛАКИ",
    "АЛКОМЕТ Шумен",
  ];

  const labourFields = [
    "ЛАКИ",
    "Проводници, клеми, накрайници",
    "Метали",
    "АТРА",
  ]

  const suppliers = [...suppliersWithAtraNumber, "Мушиков", "Други",];

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    partNumber: "",
    supplier: "",
    hasVAT: false,
    category: "",
    description: "",
    image: null,
    // ATPA specific fields
    material: "",
    dieNumber: "",
    benderNumber: "",
    step: "",
    cutting: "",
    weight: "",
    wasteWeight: "",
    partsPerSheet: "",
    laborCost: "",
    // LAKI specific fields
    pressMold: "",
    pressMoldDimensions: "",
    cleaning: "",
    finishing: "",
    castingMachine: "",
    grams: "",
    atraNumber: "",
    // Метали specific fields
    thickness: "",
    dimensions: "",
    sheetWeight: "",
    weightPerSqm: "",
    pricePerKg: "",
    // Крепежи specific fields
    din: "",
  });
  const [category, setCategory] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    fileInputRef.current.value = "";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFormData((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };
  const handleSwitchChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      hasVAT: e.target.checked,
    }));
  };

  return {
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
  };
};
