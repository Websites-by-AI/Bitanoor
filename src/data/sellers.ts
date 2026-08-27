/**
 * Bitanoor Electric - Seller Data
 * List of electric lamp manufacturers and suppliers in Iran
 */

import { Seller, SellerType, ProductionType, LeadPriority, VoltageClass } from "@/types";


// Sample data for Iranian lighting manufacturers
export const iranianSellers: Seller[] = [
  {
    id: "bitanoor",
    name: "بیتانور الکتریک",
    nameEn: "Bitanoor Electric",
    description: "تولیدکننده برتر چراغ‌های نورپردازی در ایران با بیش از ۲۰ سال تجربه",
    descriptionEn: "Leading manufacturer of lighting products in Iran with over 20 years of experience",
    type: "manufacturer",
    productionTypes: ["outdoor", "indoor", "industrial", "decorative", "smart"],
    location: {
      city: "تهران",
      cityEn: "Tehran",
      address: "تهران، خیابان کارگر شمالی، پلاک ۱۲۳",
      addressEn: "Tehran, Karagar Shomali St, No. 123",
      lat: 35.7153,
      lng: 51.3644,
    },
    contact: {
      phone: "021-12345678",
      email: "info@bitanoor.com",
      website: "https://bitanoor.com",
      telegram: "@bitanoor_elec_bot",
    },
    products: [
      "چراغ چمنی MAYA",
      "چراغ دیواری LAMIN",
      "چراغ باغی خورشیدی",
      "چراغ پارک",
      "چراغ حیاط",
    ],
    catalogAvailable: true,
    leadPriority: "P1",
    rating: 4.8,
    reviewCount: 245,
    samplePricePerLumen: 1250,
    unitCostEstimate: 15000000,
    bulkSavingPercent: 15,
    isVerified: true,
    isFeatured: true,
    country: "ایران",
    countryEn: "Iran",
  },
  {
    id: "noor_tech",
    name: "تکنولوژی نور",
    nameEn: "Noor Technology",
    description: "شرکت پیشرو در تولید چراغ‌های هوشمند و مدرن",
    descriptionEn: "Pioneering company in smart and modern lighting production",
    type: "manufacturer",
    productionTypes: ["indoor", "decorative", "smart"],
    location: {
      city: "اصفهان",
      cityEn: "Isfahan",
      address: "اصفهان، خیابان چهارباغ، پلاک ۴۵۶",
      addressEn: "Isfahan, Chaharbagh St, No. 456",
      lat: 32.6539,
      lng: 51.6663,
    },
    contact: {
      phone: "031-87654321",
      email: "sales@noortech.ir",
      website: "https://noortech.ir",
      telegram: "@noor_tech_bot",
    },
    products: [
      "آویز هوشمند",
      "لوستر مدرن",
      "چراغ دیواری کلاسیک",
      "چراغ سقفی",
    ],
    catalogAvailable: true,
    leadPriority: "P1",
    rating: 4.7,
    reviewCount: 189,
    samplePricePerLumen: 1400,
    unitCostEstimate: 18000000,
    bulkSavingPercent: 20,
    isVerified: true,
    isFeatured: true,
    country: "ایران",
    countryEn: "Iran",
  },
  {
    id: "light_master",
    name: "استاد نور",
    nameEn: "Light Master",
    description: "تخصص در چراغ‌های صنعتی و فضای باز",
    descriptionEn: "Specializing in industrial and outdoor lighting",
    type: "manufacturer",
    productionTypes: ["outdoor", "industrial", "solar"],
    location: {
      city: "شیراز",
      cityEn: "Shiraz",
      address: "شیراز، بلوار چمران، پلاک ۷۸۹",
      addressEn: "Shiraz, Chamran Blvd, No. 789",
      lat: 29.5926,
      lng: 52.5836,
    },
    contact: {
      phone: "071-55555555",
      email: "contact@lightmaster.ir",
      website: "https://lightmaster.ir",
    },
    products: [
      "چراغ سیلانی صنعتی",
      "چراغ خیابان",
      "چراغ خورشیدی",
      "چراغ پارک",
    ],
    catalogAvailable: true,
    leadPriority: "P1",
    rating: 4.6,
    reviewCount: 156,
    samplePricePerLumen: 1100,
    unitCostEstimate: 25000000,
    bulkSavingPercent: 12,
    isVerified: true,
    isFeatured: true,
    country: "ایران",
    countryEn: "Iran",
  },
  {
    id: "garden_light",
    name: "نور باغ",
    nameEn: "Garden Light Co.",
    description: "متخصص در چراغ‌های باغ و فضای سبز",
    descriptionEn: "Specialists in garden and landscape lighting",
    type: "manufacturer",
    productionTypes: ["outdoor", "garden", "decorative"],
    location: {
      city: "مشهد",
      cityEn: "Mashhad",
      address: "مشهد، خیابان احمدآباد، پلاک ۳۲۱",
      addressEn: "Mashhad, Ahmadabad St, No. 321",
      lat: 36.2605,
      lng: 59.6168,
    },
    contact: {
      phone: "051-11111111",
      email: "info@gardenlight.ir",
      website: "https://gardenlight.ir",
    },
    products: [
      "چراغ مسیر",
      "چراغ باغی",
      "چراغ چمنی",
      "چراغ تزئینی",
    ],
    catalogAvailable: true,
    leadPriority: "P2",
    rating: 4.5,
    reviewCount: 98,
    samplePricePerLumen: 1300,
    unitCostEstimate: 8500000,
    bulkSavingPercent: 18,
    isVerified: true,
    isFeatured: false,
    country: "ایران",
    countryEn: "Iran",
  },
  {
    id: "smart_lighting_ir",
    name: "نورپردازی هوشمند ایران",
    nameEn: "Smart Lighting Iran",
    description: "پیشگامان نورپردازی هوشمند و خانه هوشمند",
    descriptionEn: "Pioneers in smart lighting and smart home systems",
    type: "manufacturer",
    productionTypes: ["smart", "indoor", "decorative"],
    location: {
      city: "تبریز",
      cityEn: "Tabriz",
      address: "تبریز، خیابان آزادی، پلاک ۶۵۴",
      addressEn: "Tabriz, Azadi St, No. 654",
      lat: 38.0962,
      lng: 46.2738,
    },
    contact: {
      phone: "041-22222222",
      email: "support@smartlighting.ir",
      website: "https://smartlighting.ir",
    },
    products: [
      "لامپ LED هوشمند",
      "آویز هوشمند",
      "سیستم خانه هوشمند",
      "چراغ RGB",
    ],
    catalogAvailable: true,
    leadPriority: "P1",
    rating: 4.9,
    reviewCount: 215,
    samplePricePerLumen: 1600,
    unitCostEstimate: 12000000,
    bulkSavingPercent: 25,
    isVerified: true,
    isFeatured: true,
    country: "ایران",
    countryEn: "Iran",
  },
  {
    id: "iran_light",
    name: "ایران لایت",
    nameEn: "Iran Light",
    description: "تولیدکننده انواع چراغ‌های LED با کیفیت بالا",
    descriptionEn: "Manufacturer of high-quality LED lighting products",
    type: "manufacturer",
    productionTypes: ["indoor", "outdoor", "commercial"],
    location: {
      city: "کرج",
      cityEn: "Karaj",
      address: "کرج، شهرک صنعتی، پلاک ۹۸۷",
      addressEn: "Karaj, Industrial Town, No. 987",
      lat: 35.8327,
      lng: 50.9916,
    },
    contact: {
      phone: "026-33333333",
      email: "sales@iranlight.ir",
      website: "https://iranlight.ir",
    },
    products: [
      "چراغ سقفی LED",
      "چراغ دیواری LED",
      "چراغ راهرو",
      "چراغ تجاری",
    ],
    catalogAvailable: true,
    leadPriority: "P2",
    rating: 4.4,
    reviewCount: 76,
    samplePricePerLumen: 1000,
    unitCostEstimate: 7500000,
    bulkSavingPercent: 10,
    isVerified: true,
    isFeatured: false,
    country: "ایران",
    countryEn: "Iran",
  },
];

// Sample data for international lighting suppliers
export const internationalSellers: Seller[] = [
  {
    id: "osram",
    name: "اوسرام",
    nameEn: "OSRAM",
    description: "برند آلمانی تولیدکننده چراغ‌های با کیفیت بالا",
    descriptionEn: "German brand manufacturing high-quality lighting products",
    type: "manufacturer",
    productionTypes: ["indoor", "outdoor", "industrial", "smart"],
    location: {
      city: "برلین",
      cityEn: "Berlin",
      address: "Germany",
      addressEn: "Germany",
      lat: 52.5200,
      lng: 13.4050,
    },
    contact: {
      phone: "+49-123-456789",
      email: "info@osram.com",
      website: "https://www.osram.com",
    },
    products: [
      "چراغ LED صنعتی",
      "چراغ خیابان",
      "چراغ هوشمند",
      "چراغ تزئینی",
    ],
    catalogAvailable: true,
    leadPriority: "P1",
    rating: 4.8,
    reviewCount: 543,
    samplePricePerLumen: 2000,
    unitCostEstimate: 35000000,
    bulkSavingPercent: 30,
    isVerified: true,
    isFeatured: true,
    country: "آلمان",
    countryEn: "Germany",
  },
  {
    id: "philips",
    name: "فیلیپس",
    nameEn: "Philips",
    description: "برند هلندی پیشرو در تکنولوژی نورپردازی",
    descriptionEn: "Dutch brand leading in lighting technology",
    type: "manufacturer",
    productionTypes: ["indoor", "outdoor", "decorative", "smart"],
    location: {
      city: "آمستردام",
      cityEn: "Amsterdam",
      address: "Netherlands",
      addressEn: "Netherlands",
      lat: 52.3676,
      lng: 4.9041,
    },
    contact: {
      phone: "+31-123-456789",
      email: "info@philips.com",
      website: "https://www.philips.com",
    },
    products: [
      "چراغ LED",
      "چراغ هوشمند",
      "چراغ تزئینی",
      "چراغ صنعتی",
    ],
    catalogAvailable: true,
    leadPriority: "P1",
    rating: 4.9,
    reviewCount: 876,
    samplePricePerLumen: 2200,
    unitCostEstimate: 40000000,
    bulkSavingPercent: 35,
    isVerified: true,
    isFeatured: true,
    country: "هلند",
    countryEn: "Netherlands",
  },
];

// All sellers combined
export const allSellers: Seller[] = [...iranianSellers, ...internationalSellers];

// Filter options
export const sellerFilters = {
  types: [
    { value: "manufacturer", label: "تولیدکننده", labelEn: "Manufacturer" },
    { value: "distributor", label: "توزیع‌کننده", labelEn: "Distributor" },
    { value: "assembler", label: "مونتاژکننده", labelEn: "Assembler" },
    { value: "importer", label: "واردکننده", labelEn: "Importer" },
  ],
  productionTypes: [
    { value: "outdoor", label: "فضای باز", labelEn: "Outdoor" },
    { value: "indoor", label: "داخلی", labelEn: "Indoor" },
    { value: "industrial", label: "صنعتی", labelEn: "Industrial" },
    { value: "decorative", label: "تزئینی", labelEn: "Decorative" },
    { value: "smart", label: "هوشمند", labelEn: "Smart" },
    { value: "solar", label: "خورشیدی", labelEn: "Solar" },
    { value: "commercial", label: "تجاری", labelEn: "Commercial" },
  ],
  countries: [
    { value: "ایران", valueEn: "Iran", label: "ایران" },
    { value: "آلمان", valueEn: "Germany", label: "آلمان" },
    { value: "هلند", valueEn: "Netherlands", label: "هلند" },
    { value: "چین", valueEn: "China", label: "چین" },
    { value: "ترکیه", valueEn: "Turkey", label: "ترکیه" },
    { value: "world", valueEn: "world", label: "جهانی" },
  ],
  voltageClasses: [
    { value: "low", label: "ولتاژ پایین (۱۲-۲۴V)", labelEn: "Low Voltage (12-24V)" },
    { value: "medium", label: "ولتاژ متوسط (۱۱۰-۲۲۰V)", labelEn: "Medium Voltage (110-220V)" },
    { value: "high", label: "ولتاژ بالا (۳۸۰V+)", labelEn: "High Voltage (380V+)" },
  ],
};

// Get sellers by filter
export function getFilteredSellers(
  query: string = "",
  type: SellerType | "" = "",
  productionType: ProductionType | "" = "",
  country: string | "" = "",
  catalogOnly: boolean = false,
  scope: "iran" | "world" | "" = ""
) {
  let filtered = [...allSellers];

  // Filter by query (name or products)
  if (query) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(
      (seller) =>
        seller.name.toLowerCase().includes(searchTerm) ||
        seller.nameEn.toLowerCase().includes(searchTerm) ||
        seller.description.toLowerCase().includes(searchTerm) ||
        seller.descriptionEn.toLowerCase().includes(searchTerm) ||
        seller.products.some((p) => p.toLowerCase().includes(searchTerm))
    );
  }

  // Filter by type
  if (type) {
    filtered = filtered.filter((seller) => seller.type === type);
  }

  // Filter by production type
  if (productionType) {
    filtered = filtered.filter((seller) =>
      seller.productionTypes.includes(productionType)
    );
  }

  // Filter by country
  if (country && country !== "world") {
    filtered = filtered.filter(
      (seller) => seller.country === country || seller.countryEn === country
    );
  }

  // Filter by scope
  if (scope === "iran") {
    filtered = filtered.filter((seller) => seller.country === "ایران");
  } else if (scope === "world") {
    filtered = filtered.filter((seller) => seller.country !== "ایران");
  }

  // Filter by catalog availability
  if (catalogOnly) {
    filtered = filtered.filter((seller) => seller.catalogAvailable);
  }

  // Sort by lead priority (P1 first)
  const priorityOrder: Record<LeadPriority, number> = { P1: 1, P2: 2, P3: 3 };
  filtered.sort((a, b) => priorityOrder[a.leadPriority] - priorityOrder[b.leadPriority]);

  return filtered;
}
