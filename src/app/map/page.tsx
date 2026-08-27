"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { allSellers, getFilteredSellers, sellerFilters } from "@/data/sellers";
import { productCategories } from "@/data/catalog";

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import("@/components/MapViewer"),
  { ssr: false, loading: () => <p>در حال بارگذاری نقشه...</p> }
);

export default function MapPage() {
  const [filters, setFilters] = useState({
    query: "",
    type: "" as const,
    productionType: "" as const,
    country: "",
    catalogOnly: false,
    scope: "" as "" | "iran" | "world",
  });
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"map" | "list" | "both">("both");

  const filteredSellers = useMemo(() => {
    return getFilteredSellers(
      filters.query,
      filters.type,
      filters.productionType,
      filters.country,
      filters.catalogOnly,
      filters.scope
    );
  }, [filters]);

  const iranianSellers = useMemo(() => {
    return filteredSellers.filter((s) => s.country === "ایران");
  }, [filteredSellers]);

  const internationalSellers = useMemo(() => {
    return filteredSellers.filter((s) => s.country !== "ایران");
  }, [filteredSellers]);

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleScope = (scope: "iran" | "world" | "") => {
    setFilters((prev) => ({ ...prev, scope, country: "" }));
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      type: "",
      productionType: "",
      country: "",
      catalogOnly: false,
      scope: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">نقشه فروشندگان چراغ‌های برقی</h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredSellers.length} شرکت از {allSellers.length} شرکت موجود
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("map")}
                className={`px-4 py-2 text-sm rounded-lg ${viewMode === "map" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
              >
                🗺 نقشه
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 text-sm rounded-lg ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
              >
                📋 لیست
              </button>
              <button
                onClick={() => setViewMode("both")}
                className={`px-4 py-2 text-sm rounded-lg ${viewMode === "both" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
              >
                🗺📋 هر دو
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                جستجو
              </label>
              <input
                type="text"
                value={filters.query}
                onChange={(e) => handleFilterChange("query", e.target.value)}
                placeholder="نام شرکت یا محصول"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع فعالیت
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">همه</option>
                {sellerFilters.types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع محصول
              </label>
              <select
                value={filters.productionType}
                onChange={(e) => handleFilterChange("productionType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">همه</option>
                {sellerFilters.productionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                کشور
              </label>
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">همه</option>
                {sellerFilters.countries.map((country) => (
                  <option key={country.valueEn} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleScope("iran")}
                className={`px-4 py-2 text-sm rounded-lg ${filters.scope === "iran" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}
              >
                🇮🇷 ایران ({iranianSellers.length})
              </button>
              <button
                onClick={() => toggleScope("world")}
                className={`px-4 py-2 text-sm rounded-lg ${filters.scope === "world" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}
              >
                🌍 جهانی ({internationalSellers.length})
              </button>
              <button
                onClick={() => toggleScope("")}
                className={`px-4 py-2 text-sm rounded-lg ${filters.scope === "" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}
              >
                همه ({filteredSellers.length})
              </button>
            </div>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              پاک کردن فیلترها
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          {(viewMode === "map" || viewMode === "both") && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="h-[600px] w-full">
                  <MapContainer sellers={filteredSellers} />
                </div>
              </div>
            </div>
          )}

          {/* List Section */}
          {(viewMode === "list" || viewMode === "both") && (
            <div className={viewMode === "both" ? "lg:col-span-1" : "lg:col-span-3"}>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  لیست فروشندگان ({filteredSellers.length})
                </h2>

                <div className="space-y-3">
                  {filteredSellers.slice(0, 20).map((seller) => (
                    <div
                      key={seller.id}
                      onClick={() => setSelectedSeller(seller)}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedSeller?.id === seller.id ? "bg-blue-50 border-blue-200" : "border-gray-200"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{seller.name}</h3>
                          <p className="text-sm text-gray-500">{seller.location.city}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              {seller.leadPriority}
                            </span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full mr-2">
                              ⭐ {seller.rating}/5
                            </span>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">
                            {seller.samplePricePerLumen.toLocaleString()} IRR/lm
                          </p>
                          <p className="text-xs text-gray-500">
                            قیمت/لومن
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredSellers.length > 20 && (
                    <div className="text-center text-sm text-gray-500 py-4">
                      +{filteredSellers.length - 20} شرکت دیگر
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seller Details Modal */}
      {selectedSeller && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedSeller.name}</h2>
                <button
                  onClick={() => setSelectedSeller(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">توضیحات</h3>
                  <p className="text-gray-600 mt-1">{selectedSeller.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700">شهر</h3>
                    <p className="text-gray-600 mt-1">{selectedSeller.location.city}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">نوع فعالیت</h3>
                    <p className="text-gray-600 mt-1">{sellerFilters.types.find(t => t.value === selectedSeller.type)?.label}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">تلفن</h3>
                    <p className="text-gray-600 mt-1">{selectedSeller.contact.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">ایمیل</h3>
                    <p className="text-gray-600 mt-1">{selectedSeller.contact.email}</p>
                  </div>
                  {selectedSeller.contact.website && (
                    <div className="col-span-2">
                      <h3 className="font-medium text-gray-700">وبسایت</h3>
                      <p className="text-gray-600 mt-1">{selectedSeller.contact.website}</p>
                    </div>
                  )}
                  {selectedSeller.contact.telegram && (
                    <div className="col-span-2">
                      <h3 className="font-medium text-gray-700">تلگرام</h3>
                      <p className="text-gray-600 mt-1">{selectedSeller.contact.telegram}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-gray-700">محصولات</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSeller.products.map((product: string) => (
                      <span
                        key={product}
                        className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedSeller.rating}/5</p>
                    <p className="text-sm text-gray-500">امتیاز</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedSeller.samplePricePerLumen.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">IRR/لومن</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{selectedSeller.bulkSavingPercent}%</p>
                    <p className="text-sm text-gray-500">صرفه‌جویی</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => {
                      // Add to lead bank logic would go here
                      alert(`شرکت ${selectedSeller.name} به بانک لید اضافه شد`);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    افزودن به بانک لید
                  </button>
                  <button
                    onClick={() => {
                      // Send to messaging logic would go here
                      alert(`پیام برای ${selectedSeller.name} ارسال شد`);
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    ارسال به پیام‌رسانی
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
