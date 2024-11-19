export const INITIAL_FORM_STATE = {
  name: "",
  category: "",
  labourPrice: "",
  detailsPrices: [],
  components: [],
  image: null
};

export enum ProductCategory {
  Others = 0,
  LightningFixtures = 1,
  LEDLightningFixtures = 2,
  ElectricalInstallationMaterials = 3,
  ExplosionProof = 4,
  Disinfection = 5,
}

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.Others]: "Други",
  [ProductCategory.LightningFixtures]: "Осветителни тела",
  [ProductCategory.LEDLightningFixtures]: "Професионални LED осветителни тела",
  [ProductCategory.ElectricalInstallationMaterials]: "Електроинсталационни материали",
  [ProductCategory.ExplosionProof]: "Взривозащитени изделия",
  [ProductCategory.Disinfection]: "Дезинфекционни системи",
};
