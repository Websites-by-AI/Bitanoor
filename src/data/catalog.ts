/**
 * Bitanoor Electric - Product Catalog Data
 * Comprehensive catalog of electric lighting products
 */

import { Product, ProductCategory, ProductSpecs } from "@/types";

// Product categories for lighting
export const productCategories: ProductCategory[] = [
  {
    id: "outdoor",
    name: "چراغ‌های فضای باز",
    nameEn: "Outdoor Lighting",
    description: "چراغ‌های مناسب برای فضای باز شامل باغ، پارک، خیابان و حیاط",
    descriptionEn: "Lights suitable for outdoor spaces including gardens, parks, streets, and yards",
    icon: "🌳",
  },
  {
    id: "indoor",
    name: "چراغ‌های داخلی",
    nameEn: "Indoor Lighting",
    description: "چراغ‌های مناسب برای فضای داخلی شامل منزل، دفتر، رستوران",
    descriptionEn: "Lights suitable for indoor spaces including homes, offices, restaurants",
    icon: "🏠",
  },
  {
    id: "industrial",
    name: "چراغ‌های صنعتی",
    nameEn: "Industrial Lighting",
    description: "چراغ‌های مقاوم برای کارخانه‌ها، انبارها و فضاهای صنعتی",
    descriptionEn: "Durable lights for factories, warehouses, and industrial spaces",
    icon: "🏭",
  },
  {
    id: "decorative",
    name: "چراغ‌های تزئینی",
    nameEn: "Decorative Lighting",
    description: "چراغ‌های هنری و تزئینی برای زیباسازی فضا",
    descriptionEn: "Artistic and decorative lights for space beautification",
    icon: "🎨",
  },
  {
    id: "smart",
    name: "چراغ‌های هوشمند",
    nameEn: "Smart Lighting",
    description: "چراغ‌های قابل کنترل از راه دور با تلفن همراه",
    descriptionEn: "Remotely controllable lights via mobile phone",
    icon: "🤖",
  },
  {
    id: "solar",
    name: "چراغ‌های خورشیدی",
    nameEn: "Solar Lighting",
    description: "چراغ‌های با انرژی خورشیدی بدون نیاز به سیم‌کشی",
    descriptionEn: "Solar-powered lights without wiring",
    icon: "☀️",
  },
  {
    id: "commercial",
    name: "چراغ‌های تجاری",
    nameEn: "Commercial Lighting",
    description: "چراغ‌های مناسب برای فضاهای تجاری و اداری",
    descriptionEn: "Lights suitable for commercial and office spaces",
    icon: "🏢",
  },
  {
    id: "accessories",
    name: "لوازم جانبی",
    nameEn: "Accessories",
    description: "لوازم جانبی چراغ‌ها شامل پایه، سیم، ترانس و...",
    descriptionEn: "Lighting accessories including bases, wires, transformers, etc.",
    icon: "🔧",
  },
];

// Product interface
export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  categoryId: string;
  sellerId: string;
  specs: ProductSpecs;
  price: number; // IRR
  priceUsd?: number; // USD
  currency: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  warranty: string;
  tags: string[];
  createdAt: string;
}

export interface ProductSpecs {
  wattage: number; // W
  lumen: number; // lm
  colorTemperature: number; // K
  color: string;
  colorEn: string;
  material: string;
  materialEn: string;
  ipRating: string;
  voltage: string;
  lifespan: string;
  dimensions: {
    length?: number;
    width?: number;
    height?: number;
    unit: string;
  };
  weight: number; // kg
  certification: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
}

// Sample products for Bitanoor Electric
export const products: Product[] = [
  // Bitanoor products
  {
    id: "maya_60",
    name: "چراغ چمنی MAYA 60 سانتیمتر",
    nameEn: "MAYA 60cm Lawn Lamp",
    description: "چراغ چمنی مدرن با بدنه آلومینیومی و شیشه مات. ایده‌آل برای باغ‌ها، ویلاها و مسیرهای پیاده‌روی.",
    descriptionEn: "Modern lawn lamp with aluminum body and frosted glass. Ideal for gardens, villas, and walkways.",
    categoryId: "outdoor",
    sellerId: "bitanoor",
    specs: {
      wattage: 12,
      lumen: 1200,
      colorTemperature: 4000,
      color: "سفید گرم",
      colorEn: "Warm White",
      material: "آلومینیوم",
      materialEn: "Aluminum",
      ipRating: "IP65",
      voltage: "220V AC",
      lifespan: "50,000 ساعت",
      dimensions: { height: 60, unit: "cm" },
      weight: 1.2,
      certification: ["CE", "RoHS"],
    },
    price: 12500000,
    currency: "IRR",
    images: [
      "https://via.placeholder.com/400x300?text=MAYA+60+Lawn+Lamp",
      "https://via.placeholder.com/400x300?text=MAYA+60+Side+View",
    ],
    rating: 4.8,
    reviewCount: 245,
    stock: 150,
    isNew: false,
    isFeatured: true,
    isAvailable: true,
    warranty: "2 سال",
    tags: ["چمن", "باغ", "فضای باز", "مدرن", "ضد آب"],
    createdAt: "2026-01-15",
  },
  {
    id: "lamin_wall",
    name: "چراغ دیواری LAMIN",
    nameEn: "LAMIN Wall Lamp",
    description: "چراغ دیواری کلاسیک با طراحی شیک و بدنه برنجی. مناسب برای ویلاها، هتل‌ها و رستوران‌ها.",
    descriptionEn: "Classic wall lamp with elegant design and brass body. Suitable for villas, hotels, and restaurants.",
    categoryId: "indoor",
    sellerId: "bitanoor",
    specs: {
      wattage: 8,
      lumen: 800,
      colorTemperature: 3000,
      color: "طلا",
      colorEn: "Gold",
      material: "برنج",
      materialEn: "Brass",
      ipRating: "IP44",
      voltage: "220V AC",
      lifespan: "35,000 ساعت",
      dimensions: { height: 30, width: 15, unit: "cm" },
      weight: 0.8,
      certification: ["CE"],
    },
    price: 8500000,
    currency: "IRR",
    images: [
      "https://via.placeholder.com/400x300?text=LAMIN+Wall+Lamp",
    ],
    rating: 4.6,
    reviewCount: 189,
    stock: 80,
    isNew: false,
    isFeatured: true,
    isAvailable: true,
    warranty: "1 سال",
    tags: ["دیواری", "کلاسیک", "برنج", "داخلی", "شیک"],
    createdAt: "2026-01-15",
  },
  {
    id: "solar_garden",
    name: "چراغ باغی خورشیدی",
    nameEn: "Solar Garden Lamp",
    description: "چراغ باغی خورشیدی با باتری لیتیوم و پنل خورشیدی. بدون نیاز به سیم‌کشی، نصب آسان.",
    descriptionEn: "Solar garden lamp with lithium battery and solar panel. No wiring required, easy installation.",
    categoryId: "solar",
    sellerId: "bitanoor",
    specs: {
      wattage: 5,
      lumen: 450,
      colorTemperature: 6000,
      color: "سفید سرد",
      colorEn: "Cool White",
      material: "استیل",
      materialEn: "Stainless Steel",
      ipRating: "IP67",
      voltage: "3.7V DC (Solar)",
      lifespan: "50,000 ساعت",
      dimensions: { height: 45, unit: "cm" },
      weight: 0.5,
      certification: ["CE", "RoHS"],
    },
    price: 5800000,
    currency: "IRR",
    images: [
      "https://via.placeholder.com/400x300?text=Solar+Garden+Lamp",
    ],
    rating: 4.7,
    reviewCount: 203,
    stock: 200,
    isNew: true,
    isFeatured: true,
    isAvailable: true,
    warranty: "1 سال",
    tags: ["خورشیدی", "باغ", "بدون سیم", "آسان نصب"],
    createdAt: "2026-02-01",
  },
  {
    id: "park_light_8m",
    name: "چراغ پارک 8 متر",
    nameEn: "Park Light 8m",
    description: "چراغ پارک بلند با LED قدرتمند برای روشنایی فضاهای بزرگ فضای باز.",
    descriptionEn: "Tall park light with powerful LED for lighting large outdoor areas.",
    categoryId: "outdoor",
    sellerId: "bitanoor",
    specs: {
      wattage: 60,
      lumen: 6000,
      colorTemperature: 4000,
      color: "سفید خنثی",
      colorEn: "Neutral White",
      material: "آلیاژ آلومینیوم",
      materialEn: "Aluminum Alloy",
      ipRating: "IP65",
      voltage: "220V AC",
      lifespan: "60,000 ساعت",
      dimensions: { height: 800, unit: "cm" },
      weight: 8.5,
      certification: ["CE", "ISO 9001"],
    },
    price: 25000000,
    currency: "IRR",
    images: [
      "https://via.placeholder.com/400x300?text=Park+Light+8m",
    ],
    rating: 4.5,
    reviewCount: 78,
    stock: 50,
    isNew: false,
    isFeatured: false,
    isAvailable: true,
    warranty: "3 سال",
    tags: ["پارک", "بلند", "قوی", "فضای باز"],
    createdAt: "2026-01-15",
  },
  
  // Noor Technology products
  {
    id: "smart_pendant",
    name: "آویز هوشمند",
    nameEn: "Smart Pendant Light",
    description: "آویز هوشمند با کنترل وای‌فای و تغییر رنگ. سازگار با سیستم‌های خانه هوشمند.",
    descriptionEn: "Smart pendant light with WiFi control and color changing. Compatible with smart home systems.",
    categoryId: "smart",
    sellerId: "noor_tech",
    specs: {
      wattage: 20,
      lumen: 1800,
      colorTemperature: "2700-6500K",
      color: "RGB",
      colorEn: "RGB",
      material: "آلومینیوم",
      materialEn: "Aluminum",
      ipRating: "IP20",
      voltage: "220V AC",
      lifespan: "40,000 ساعت",
      dimensions: { height: 120, unit: "cm" },
      weight: 1.5,
      certification: ["CE", "FCC"],
    },
    price: 18000000,
    currency: "IRR",
    images: [
      "https://via.placeholder.com/400x300?text=Smart+Pendant+Light",
    ],
    rating: 4.9,
    reviewCount: 156,
    stock: 120,
    isNew: true,
    isFeatured: true,
    isAvailable: true,
    warranty: "2 سال",
    tags: ["هوشمند", "آویز", "وای‌فای", "RGB", "تغییر رنگ"],
    createdAt: "2026-03-10",
  },
  {
    id: "modern_chandelier",
    name: "لوستر مدرن",
    nameEn: "Modern Chandelier",
    description: "لوستر مدرن شیک با عناصر کریستال. ایده‌آل برای سالن پذیرایی و فضای غذاخوری.",
    descriptionEn: "Elegant modern chandelier with crystal elements. Ideal for living rooms and dining areas.",
    categoryId: "decorative",
    sellerId: "noor_tech",
    specs: {
      wattage: 60,
      lumen: 4800,
      colorTemperature: 3000,
      color: "طلا/کروم",
      colorEn: "Gold/Chrome",
      material: "فلز + کریستال",
      materialEn: "Metal + Crystal",
      ipRating: "IP20",
      voltage: "220V AC",
      lifespan: "50,000 ساعت",
      dimensions: { height: 80, width: 60, unit: "cm" },
      weight: 4.5,
      certification: ["CE"],
    },
    price: 45000000,
    currency: "IRR",
    images: [
      "https://via.placeholder.com/400x300?text=Modern+Chandelier",
    ],
    rating: 4.7,
    reviewCount: 89,
    stock: 45,
    isNew: false,
    isFeatured: true,
    isAvailable: true,
    warranty: "2 سال",
    tags: ["لوستر", "مدرن", "کریستال", "تزیینی", "لوکس"],
    createdAt: "2026-01-20",
  },
  
  // Light Master products
  {
    id: "industrial_flood",
    name: "چراغ سیلانی صنعتی",
    nameEn: "Industrial Flood Light",
    description: "چراغ سیلانی صنعتی مقاوم برای کارخانه‌ها، انبارها و فضاهای بزرگ فضای باز.",
    descriptionEn: "Heavy-duty industrial flood light for factories, warehouses, and large outdoor areas.",
    categoryId: "industrial",
    sellerId: "light_master",
    specs: {
      wattage: 100,
      lumen: 10000,
      colorTemperature: 5000,
      color: "سفید",
      colorEn: "White",
      material: "آلومینیوم ریخته‌گری",
      materialEn: "Die-cast Aluminum",
      ipRating: "IP66",
      voltage: "220V AC",
      lifespan: "70,000 ساعت",
      dimensions: { height: 60, width: 40, unit: "cm" },
      weight: 7.2,
      certification: ["CE", "IP66"],
    },
    price: 35000000,
    currency: "IRR",
    images: [
      "https://via.placeholder.com/400x300?text=Industrial+Flood+Light",
    ],
    rating: 4.8,
    reviewCount: 112,
    stock: 75,
    isNew: false,
    isFeatured: false,
    isAvailable: true,
    warranty: "3 سال",
    tags: ["صنعتی", "سیلانی", "مقاوم", "کارخانه", "انبار"],
    createdAt: "2026-01-15",
  },
  {
    id: "street_light_12m",
    name: "چراغ خیابان 12 متر",
    nameEn: "Street Light 12m",
    description: "چراغ خیابان بلند با LED کم‌مصرف. مناسب برای بزرگراه‌ها و جاده‌های اصلی.",
    descriptionEn: "Tall street light with energy-efficient LED. Suitable for highways and main roads.",
    categoryId: "outdoor",
    sellerId: "light_master",
    specs: {
      wattage: 120,
      lumen: 12000,
      colorTemperature: 5000,
      color: "سفید خنثی",
      colorEn: "Neutral White",
      material: "فولاد گالوانیزه",
      materialEn: "Galvanized Steel",
      ipRating: "IP65",
      voltage: "220V AC",
      lifespan: "80,000 ساعت",
      dimensions: { height: 1200, unit: "cm" },
      weight: 15.0,
      certification: ["CE", "ISO 9001"],
    },
    price: 48000000,
    currency: "IRR",
    images: [
      "https://via.placeholder.com/400x300?text=Street+Light+12m",
    ],
    rating: 4.6,
    reviewCount: 65,
    stock: 30,
    isNew: true,
    isFeatured: true,
    isAvailable: true,
    warranty: "5 سال",
    tags: ["خیابان", "بزرگراه", "بلند", "کم مصرف", "LED"],
    createdAt: "2026-03-15",
  },
  
  // Garden Light products
  {
    id: "pathway_light",
    name: "چراغ مسیر",
    nameEn: "Pathway Light",
    description: "چراغ‌های کوچک مسیر برای باغ‌ها و مسیرهای پیاده‌روی. با گزینه‌های خورشیدی یا برقی.",
    descriptionEn: "Small pathway lights for gardens and walkways. Available with solar or electric options.",
    categoryId: "outdoor",
    sellerId: "garden_light",
    specs: {
      wattage: 3,
      lumen: 250,
      colorTemperature: 3000,
      color: "برنز/مشکی",
      colorEn: "Bronze/Black",
      material: "استیل",
      materialEn: "Stainless Steel",
      ipRating: "IP65",
      voltage: "12V DC / Solar",
      lifespan: "40,000 ساعت",
      dimensions: { height: 30, unit: "cm" },
      weight: 0.3,
      certification: ["CE"],
    },
    price: 3200000,
    currency: "IRR",
    images: [
      "https://via.placeholder.com/400x300?text=Pathway+Light",
    ],
    rating: 4.4,
    reviewCount: 45,
    stock: 300,
    isNew: false,
    isFeatured: false,
    isAvailable: true,
    warranty: "1 سال",
    tags: ["مسیر", "باغ", "کوچک", "تزیینی", "فضای باز"],
    createdAt: "2026-01-15",
  },
  
  // Smart Lighting Iran products
  {
    id: "smart_bulb",
    name: "لامپ LED هوشمند",
    nameEn: "Smart LED Bulb",
    description: "لامپ LED هوشمند با کنترل اپلیکیشن، تغییر رنگ و سازگاری با دستیارهای صوتی.",
    descriptionEn: "Smart LED bulb with app control, color changing, and voice assistant compatibility.",
    categoryId: "smart",
    sellerId: "smart_lighting_ir",
    specs: {
      wattage: 9,
      lumen: 800,
      colorTemperature: "2700-6500K",
      color: "RGB",
      colorEn: "RGB",
      material: "پلاستیک",
      materialEn: "Plastic",
      ipRating: "IP20",
      voltage: "220V AC",
      lifespan: "25,000 ساعت",
      dimensions: { height: 10, width: 6, unit: "cm" },
      weight: 0.15,
      certification: ["CE", "FCC"],
    },
    price: 850000,
    currency: "IRR",
    images: [
      "https://via.placeholder.com/400x300?text=Smart+LED+Bulb",
    ],
    rating: 4.8,
    reviewCount: 234,
    stock: 500,
    isNew: true,
    isFeatured: true,
    isAvailable: true,
    warranty: "1 سال",
    tags: ["هوشمند", "لامپ", "LED", "وای‌فای", "تغییر رنگ"],
    createdAt: "2026-04-01",
  },
];

// Get products by filter
export function getFilteredProducts(
  query: string = "",
  categoryId: string | "" = "",
  sellerId: string | "" = "",
  minPrice: number | "" = 0,
  maxPrice: number | "" = Infinity,
  isFeatured: boolean | "" = false,
  isNew: boolean | "" = false,
  limit: number = 50
) {
  let filtered = [...products];

  // Filter by query
  if (query) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.nameEn.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.descriptionEn.toLowerCase().includes(searchTerm) ||
        product.tags.some((t) => t.toLowerCase().includes(searchTerm))
    );
  }

  // Filter by category
  if (categoryId) {
    filtered = filtered.filter((product) => product.categoryId === categoryId);
  }

  // Filter by seller
  if (sellerId) {
    filtered = filtered.filter((product) => product.sellerId === sellerId);
  }

  // Filter by price range
  if (minPrice !== "") {
    filtered = filtered.filter((product) => product.price >= minPrice);
  }
  if (maxPrice !== "") {
    filtered = filtered.filter((product) => product.price <= maxPrice);
  }

  // Filter by featured
  if (isFeatured !== "") {
    filtered = filtered.filter((product) => product.isFeatured === isFeatured);
  }

  // Filter by new
  if (isNew !== "") {
    filtered = filtered.filter((product) => product.isNew === isNew);
  }

  // Sort by rating (descending)
  filtered.sort((a, b) => b.rating - a.rating);

  // Limit results
  return filtered.slice(0, limit);
}

// Get featured products
export function getFeaturedProducts(limit: number = 10) {
  return products
    .filter((p) => p.isFeatured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Get new products
export function getNewProducts(limit: number = 10) {
  return products
    .filter((p) => p.isNew)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

// Get products by category
export function getProductsByCategory(categoryId: string, limit: number = 20) {
  return products
    .filter((p) => p.categoryId === categoryId)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Get products by seller
export function getProductsBySeller(sellerId: string, limit: number = 20) {
  return products
    .filter((p) => p.sellerId === sellerId)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Export types for use in other files
export type { Product, ProductCategory, ProductSpecs };
