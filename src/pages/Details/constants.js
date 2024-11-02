// constants.js
export const CATEGORIES = {
  GLASS: "Стъкла",
  METALS: "Метали",
  FASTENERS: "Крепежи",
  CONDUCTORS: "Проводници, клеми, накрайници",
  ATRA: "АТРА",
  LAKI: "ЛАКИ",
  OTHERS: "Други",
};

export const MATERIALS = {
  ALUMINUM: "Алуминий",
  STEEL: "Стомана",
  COPPER: "Мед",
  BRASS: "Месинг",
  PLASTIC: "Пластмаса",
  OTHERS: "Други",
};

export const SUPPLIERS = {
  DIKO: "DIKO",
  ALUCOM: "АЛУКОМ Плевен",
  ANGEL_POPOV: "Ангел Попов",
  LAKI: "ЛАКИ",
  ALCOMET: "АЛКОМЕТ Шумен",
  MUSHIKOV: "Мушиков",
  OTHERS: "Други",
};

export const SUPPLIERS_WITH_ATRA_NUMBER = [
  SUPPLIERS.DIKO,
  SUPPLIERS.ALUCOM,
  SUPPLIERS.ANGEL_POPOV,
  SUPPLIERS.LAKI,
  SUPPLIERS.ALCOMET,
];

export const CATEGORIES_WITH_LABOR = [
  CATEGORIES.LAKI,
  CATEGORIES.CONDUCTORS,
  CATEGORIES.METALS,
  CATEGORIES.ATRA,
];

// constants.js
export const INITIAL_FORM_STATE = {
  // Basic fields
  name: "",
  detailPrices: [0],
  partNumber: "",
  supplier: "",
  hasVAT: false,
  category: "",
  description: "",
  image: null,
  detailWeights: [0],

  // Extra characteristics for conditional fields
  extraCharacteristics: {
    // ATRA specific fields
    material: "",
    dieNumber: "",
    benderNumber: "",
    step: "",
    cutting: "",
    wasteWeight: "",
    partsPerSheet: "",
    laborCost: "",
    atraNumber: "",

    // LAKI specific fields
    pressMold: "",
    pressMoldDimensions: "",
    cleaning: "",
    finishing: "",
    castingMachine: "",
    grams: "",

    // Metal specific fields
    thickness: "",
    dimensions: "",
    sheetWeight: "",
    weightPerSqm: "",
    pricePerKg: "",

    // Fasteners specific fields
    din: "",
  },
};

export const REQUIRED_FIELDS = {
  BASIC: ["name", "price", "partNumber", "supplier", "category"],
  [CATEGORIES.FASTENERS]: ["din"],
  [CATEGORIES.ATRA]: ["material"],
  // Add other category-specific required fields
};

export const IMAGE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ["image/jpeg", "image/png", "image/gif"],
  MAX_DIMENSIONS: {
    width: 2000,
    height: 2000,
  },
};
