/**
 * Bitanoor Electric - Demo Accounts Data
 * Demo user accounts for testing the application
 */

import { User, UserRole } from "@/types";

// User role types
export type UserRole = "admin" | "seller" | "buyer" | "customer" | "marketer";

// User interface
export interface User {
  id: string;
  phone: string;
  password: string; // In production, use hashed passwords
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

// Demo accounts for testing
export const demoAccounts: User[] = [
  // Admin account
  {
    id: "admin_001",
    phone: "09120000001",
    password: "demo123", // In production, use hashed passwords
    name: "مدیر سامانه",
    company: "بیتانور الکتریک",
    city: "تهران",
    role: "admin",
    email: "admin@bitanoor.com",
    avatar: "https://via.placeholder.com/100x100?text=Admin",
    createdAt: "2026-01-01",
    lastLogin: "2026-08-25",
    isActive: true,
    isVerified: true,
  },
  
  // Seller accounts
  {
    id: "seller_001",
    phone: "09123333333",
    password: "demo123",
    name: "نیان نور",
    company: "نیان نور",
    city: "تهران",
    role: "seller",
    email: "info@niyan-noor.com",
    avatar: "https://via.placeholder.com/100x100?text=Seller1",
    createdAt: "2026-01-02",
    lastLogin: "2026-08-24",
    isActive: true,
    isVerified: true,
  },
  {
    id: "seller_002",
    phone: "09124444444",
    password: "demo123",
    name: "توسعه حرکت HTI",
    company: "توسعه حرکت HTI",
    city: "اصفهان",
    role: "seller",
    email: "info@hti-dev.com",
    avatar: "https://via.placeholder.com/100x100?text=Seller2",
    createdAt: "2026-01-03",
    lastLogin: "2026-08-23",
    isActive: true,
    isVerified: true,
  },
  
  // Buyer accounts
  {
    id: "buyer_001",
    phone: "09121111111",
    password: "demo123",
    name: "رضا کریمی",
    company: "شرکت رضا",
    city: "تهران",
    role: "buyer",
    email: "reza.karimi@email.com",
    avatar: "https://via.placeholder.com/100x100?text=Buyer1",
    createdAt: "2026-01-04",
    lastLogin: "2026-08-22",
    isActive: true,
    isVerified: true,
  },
  
  // Customer accounts
  {
    id: "customer_001",
    phone: "09125555555",
    password: "demo123",
    name: "مهدی رضایی",
    company: "",
    city: "تهران",
    role: "customer",
    email: "mehdi.rezaei@email.com",
    avatar: "https://via.placeholder.com/100x100?text=Customer1",
    createdAt: "2026-01-05",
    lastLogin: "2026-08-21",
    isActive: true,
    isVerified: true,
  },
  {
    id: "customer_002",
    phone: "09126666666",
    password: "demo123",
    name: "سارا احمدی",
    company: "",
    city: "کرج",
    role: "customer",
    email: "sara.ahmadi@email.com",
    avatar: "https://via.placeholder.com/100x100?text=Customer2",
    createdAt: "2026-01-06",
    lastLogin: "2026-08-20",
    isActive: true,
    isVerified: true,
  },
  
  // Marketer account
  {
    id: "marketer_001",
    phone: "09128888888",
    password: "demo123",
    name: "زهرا موسوی",
    company: "آژانس بازاریابی نور",
    city: "تهران",
    role: "marketer",
    email: "zahra.mousavi@marketing.com",
    avatar: "https://via.placeholder.com/100x100?text=Marketer",
    createdAt: "2026-01-07",
    lastLogin: "2026-08-19",
    isActive: true,
    isVerified: true,
  },
];

// Get user by phone number
export function getUserByPhone(phone: string): User | undefined {
  return demoAccounts.find((user) => user.phone === phone);
}

// Get user by ID
export function getUserById(id: string): User | undefined {
  return demoAccounts.find((user) => user.id === id);
}

// Role labels for display
export const roleLabels: Record<UserRole, { fa: string; en: string }> = {
  admin: { fa: "ادمین", en: "Admin" },
  seller: { fa: "فروشنده", en: "Seller" },
  buyer: { fa: "خریدار", en: "Buyer" },
  customer: { fa: "مشتری", en: "Customer" },
  marketer: { fa: "بازاریاب", en: "Marketer" },
};

// Dashboard labels for each role
export const dashboardLabels: Record<UserRole, { fa: string; en: string }> = {
  admin: { fa: "داشبورد ادمین", en: "Admin Dashboard" },
  seller: { fa: "داشبورد فروشنده", en: "Seller Dashboard" },
  buyer: { fa: "داشبورد خریدار", en: "Buyer Dashboard" },
  customer: { fa: "داشبورد مشتری", en: "Customer Dashboard" },
  marketer: { fa: "داشبورد بازاریاب", en: "Marketer Dashboard" },
};

// Export types
export type { User };
