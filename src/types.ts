/**
 * Bitanoor Electric - Type Definitions
 * Central type definitions for the application
 */

// User types
export type UserRole = "admin" | "seller" | "buyer" | "customer" | "marketer";

export interface User {
  id: string;
  phone: string;
  password: string;
  name: string;
  company?: string;
  city?: string;
  role: UserRole;
  email?: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  isVerified: boolean;
}

// Seller types
export type LeadPriority = "P1" | "P2" | "P3";
export type SellerType = "manufacturer" | "distributor" | "assembler" | "importer";
export type ProductionType = "outdoor" | "indoor" | "industrial" | "decorative" | "smart" | "solar" | "commercial";
export type VoltageClass = "low" | "medium" | "high" | "very_high";

export interface Location {
  city: string;
  cityEn: string;
  address: string;
  addressEn: string;
  lat: number;
  lng: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
  telegram?: string;
}

export interface Seller {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  type: SellerType;
  productionTypes: ProductionType[];
  location: Location;
  contact: ContactInfo;
  products: string[];
  catalogAvailable: boolean;
  leadPriority: LeadPriority;
  rating: number;
  reviewCount: number;
  samplePricePerLumen: number;
  unitCostEstimate: number;
  bulkSavingPercent: number;
  isVerified: boolean;
  isFeatured: boolean;
  country: string;
  countryEn: string;
}

// Product types
export interface ProductSpecs {
  wattage: number; // W
  lumen: number; // lm
  colorTemperature: number | string; // K
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

export interface ProductCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
}

// Lead types
export interface Lead {
  id: string;
  userId: string;
  sellerId: string;
  productId?: string;
  status: "new" | "contacted" | "negotiating" | "closed" | "lost";
  priority: LeadPriority;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// Message types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  channel: "telegram" | "bale" | "email" | "sms";
  status: "draft" | "sent" | "delivered" | "read";
  isApproved: boolean;
  dryRun: boolean;
  createdAt: string;
}

// Telegram types
export interface TelegramUpdate {
  update_id: number;
  message?: {
    chat: {
      id: number;
      type: string;
      username?: string;
      first_name?: string;
      last_name?: string;
    };
    from?: {
      id: number;
      is_bot?: boolean;
      first_name?: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    text?: string;
    entities?: any[];
    message_id: number;
    date: number;
  };
  callback_query?: {
    id: string;
    from: {
      id: number;
      is_bot: boolean;
      first_name?: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    chat_instance: string;
    data?: string;
    message?: {
      chat: {
        id: number;
        type: string;
      };
      message_id: number;
    };
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Filter types
export interface SellerFilters {
  query?: string;
  type?: SellerType;
  productionType?: ProductionType;
  country?: string;
  catalogOnly?: boolean;
  scope?: "iran" | "world";
}

export interface ProductFilters {
  query?: string;
  categoryId?: string;
  sellerId?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isNew?: boolean;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Export all types
export type {
  UserRole,
  User,
  LeadPriority,
  SellerType,
  ProductionType,
  VoltageClass,
  Location,
  ContactInfo,
  Seller,
  ProductSpecs,
  Product,
  ProductCategory,
  Lead,
  Message,
  TelegramUpdate,
  ApiResponse,
  SellerFilters,
  ProductFilters,
  PaginatedResponse,
};
