// constants.ts
export enum WeightUnit {
  Other = 0,
  PerSheet = 1,
  PerKg = 2,
  PerSquareMeter = 3,
  ScrapWeight = 4,
  PerOne = 5,
}
export const WEIGHT_UNIT_LABELS: Record<WeightUnit, string> = {
  [WeightUnit.Other]: "Друга",
  [WeightUnit.PerSheet]: "За лист",
  [WeightUnit.PerKg]: "За килограм",
  [WeightUnit.PerSquareMeter]: "За кв. метър",
  [WeightUnit.ScrapWeight]: "Отпадък",
  [WeightUnit.PerOne]: "За бройка",
};

export enum PriceUnit {
  Other = 0,
  PerOne = 1,
  PerSheet = 2,
  PerKg = 3,
  PerSquareMeter = 4,
}
export const PRICE_UNIT_LABELS: Record<PriceUnit, string> = {
  [PriceUnit.Other]: "Друга",
  [PriceUnit.PerOne]: "За брой",
  [PriceUnit.PerSheet]: "За лист",
  [PriceUnit.PerKg]: "За килограм",
  [PriceUnit.PerSquareMeter]: "кв.м",
};

export enum Category {
  Other = 0,
  Glass = 1,
  Metal = 2,
  Fastener = 3,
  WireTerminalConnector = 4,
  AtraDetail = 5,
  LakiDetail = 6,
}
export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.Other]: "Други",
  [Category.Glass]: "Стъкла",
  [Category.Metal]: "Метали",
  [Category.Fastener]: "Крепежи",
  [Category.WireTerminalConnector]: "Проводници, клеми, накрайници",
  [Category.AtraDetail]: "АТРА",
  [Category.LakiDetail]: "ЛАКИ",
};

export enum Material {
  Other = 0,
  Aluminium = 1,
  Copper = 3,
  Brass = 4,
  GalvanizedMetal = 5,
  StainlessSteel = 6,
  BlackMetal = 7,
  Plastic = 8,
  NormalGlass = 9,
  TemperedGlass = 10,
}
export const MATERIAL_LABELS: Record<Material, string> = {
  [Material.Aluminium]: "Алуминий",
  [Material.Copper]: "Мед",
  [Material.Brass]: "Месингова ламарина",
  [Material.GalvanizedMetal]: "Поцинкована ламарина",
  [Material.StainlessSteel]: "Неръждаема ламарина",
  [Material.BlackMetal]: "Черна ламарина",
  [Material.Plastic]: "Пластмаса",
  [Material.NormalGlass]: "Нормално стъкло",
  [Material.TemperedGlass]: "Темперирано стъкло",
  [Material.Other]: "Други",
};

export enum Supplier {
  Other = 0,
  Diko = 1,
  Alucom = 2,
  AngelPopov = 3,
  Laki = 4,
  Alcomet = 5,
  Mushikov = 6,
}
export const SUPPLIER_LABELS: Record<Supplier, string> = {
  [Supplier.Other]: "Други",
  [Supplier.Diko]: "DIKO",
  [Supplier.Alucom]: "АЛУКОМ Плевен",
  [Supplier.AngelPopov]: "Ангел Попов",
  [Supplier.Laki]: "ЛАКИ",
  [Supplier.Alcomet]: "АЛКОМЕТ Шумен",
  [Supplier.Mushikov]: "Мушиков",
};

export type EnumLabels<T extends { [key: number]: string }> = {
  [K in keyof T]: string;
};

export const getLabelByEnum = <T extends number>(
  enumObj: Record<T, string>,
  value: T
): string => enumObj[value] || enumObj[0];

export const INITIAL_FORM_STATE = {
  // Basic fields
  name: "",
  detailNumber: "",
  atraNumber: "",
  supplier: "",
  description: "",
  hasVAT: false,
  category: "",
  labourPrice: "", // null,
  detailPrices: [
    {
      value: "", // null,
      unit: PriceUnit.PerOne,
    },
  ],
  detailWeights: [
    {
      value: "", // null,
      unit: WeightUnit.PerOne,
    },
  ],
  image: null,
  // Extra characteristics for conditional fields
  extraCharacteristics: {
    // ATRA specific fields
    material: "",
    dieNumber: "",
    benderNumber: "",
    step: "",//null,
    layout: "",
    detailsPerHit: "", //null,
    detailsPerSheet: "", //null,

    // Fasteners specific fields
    din: "",

    // LAKI specific fields
    pressMold: "",
    pressMoldSizes: "",
    castingMachine: "",
    cleaning: "",
    finishing: "",

    // Metal specific fields
    thicknessValue: "", //null,
    sizes: "",
  },
};

export const IMAGE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024,
  ACCEPTED_TYPES: ["image/jpeg", "image/png", "image/gif"],
  MAX_DIMENSIONS: {
    width: 2000,
    height: 2000,
  },
};
