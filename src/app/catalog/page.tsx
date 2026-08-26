"use client";

import { useState, useMemo } from "react";
import { products, getFilteredProducts, productCategories, getFeaturedProducts, getNewProducts } from "@/data/catalog";
import { allSellers } from "@/data/sellers";

// Price formatter
const formatPrice = (price: number) => {
  return price.toLocaleString("fa-IR");
};

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    query: "",
    categoryId: "" as string | "",
    sellerId: "" as string | "",
    minPrice: 0,
    maxPrice: Infinity,
    isFeatured: false as boolean | "",
    isNew: false as boolean | "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("grid");

  const filteredProducts = useMemo(() => {
    return getFilteredProducts(
      filters.query,
      filters.categoryId,
      filters.sellerId,
      filters.minPrice,
      filters.maxPrice,
      filters.isFeatured,
      filters.isNew,
      100
    );
  }, [filters]);

  const handleFilterChange = (key: string, value: string | number | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      categoryId: "",
      sellerId: "",
      minPrice: 0,
      maxPrice: Infinity,
      isFeatured: false,
      isNew: false,
    });
  };

  const getSellerName = (sellerId: string) => {
    const seller = allSellers.find((s) => s.id === sellerId);
    return seller ? seller.name : "نامشخص";
  };

  const getCategoryName = (categoryId: string) => {
    const category = productCategories.find((c) => c.id === categoryId);
    return category ? category.name : "نامشخص";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">کاتالوگ محصولات چراغ‌های برقی</h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredProducts.length} محصول از {products.length} محصول موجود
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 text-sm rounded-lg ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
              >
                ✨ گرید
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 text-sm rounded-lg ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
              >
                📋 لیست
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-2 text-sm rounded-lg ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
              >
                📊 جدول
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                جستجو
              </label>
              <input
                type="text"
                value={filters.query}
                onChange={(e) => handleFilterChange("query", e.target.value)}
                placeholder="نام محصول"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                دسته
              </label>
              <select
                value={filters.categoryId}
                onChange={(e) => handleFilterChange("categoryId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">همه دسته‌ها</option>
                {productCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                فروشنده
              </label>
              <select
                value={filters.sellerId}
                onChange={(e) => handleFilterChange("sellerId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">همه فروشندگان</option>
                {allSellers.map((seller) => (
                  <option key={seller.id} value={seller.id}>
                    {seller.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                حداقل قیمت
              </label>
              <input
                type="number"
                value={filters.minPrice === 0 ? "" : filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", parseInt(e.target.value) || 0)}
                placeholder="۰"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                حداکثر قیمت
              </label>
              <input
                type="number"
                value={filters.maxPrice === Infinity ? "" : filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", parseInt(e.target.value) || Infinity)}
                placeholder="بی‌نهایت"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleFilterChange("isFeatured", true)}
                className={`px-4 py-2 text-sm rounded-lg ${filters.isFeatured === true ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}
              >
                ⭐ ویژه
              </button>
              <button
                onClick={() => handleFilterChange("isNew", true)}
                className={`px-4 py-2 text-sm rounded-lg ${filters.isNew === true ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}
              >
                🆕 جدید
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
        {/* Featured Products */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-4 px-6 rounded-lg">
            <h2 className="text-xl font-bold">محصولات ویژه</h2>
            <p className="text-sm mt-1">برترین محصولات با بالاترین امتیاز</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {getFeaturedProducts(8).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                  <img
                    src={product.images[0] || "/images/product-placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/product-placeholder.png";
                    }}
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{getCategoryName(product.categoryId)}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-blue-600">
                    {formatPrice(product.price)} {product.currency}
                  </p>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐ {product.rating}</span>
                    <span className="text-xs text-gray-500 mr-1">({product.reviewCount})</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Products */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 px-6 rounded-lg">
            <h2 className="text-xl font-bold">محصولات جدید</h2>
            <p className="text-sm mt-1">آخرین محصولات اضافه شده</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {getNewProducts(8).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                  <img
                    src={product.images[0] || "/images/product-placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/product-placeholder.png";
                    }}
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{getCategoryName(product.categoryId)}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-blue-600">
                    {formatPrice(product.price)} {product.currency}
                  </p>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐ {product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              نتایج ({filteredProducts.length})
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                🖨 چاپ
              </button>
              <a
                href={`/api/catalog/csv`}
                download
                className="px-4 py-2 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
              >
                📥 دانلود CSV
              </a>
              <a
                href={`/api/catalog/html`}
                target="_blank"
                className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
              >
                📄 HTML
              </a>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                    <img
                      src={product.images[0] || "/images/product-placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/product-placeholder.png";
                      }}
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{getCategoryName(product.categoryId)}</p>
                  <p className="text-sm text-gray-500 mb-2">فروشنده: {getSellerName(product.sellerId)}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-blue-600">
                      {formatPrice(product.price)} {product.currency}
                    </p>
                    <div className="flex items-center">
                      <span className="text-yellow-500">⭐ {product.rating}</span>
                      <span className="text-xs text-gray-500 mr-1">({product.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      توان: {product.specs.wattage}W | نور: {product.specs.lumen}lm | IP: {product.specs.ipRating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                    <img
                      src={product.images[0] || "/images/product-placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/product-placeholder.png";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {getCategoryName(product.categoryId)} - {getSellerName(product.sellerId)}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      توان: {product.specs.wattage}W | نور: {product.specs.lumen}lm | رنگ: {product.specs.color}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-blue-600">
                        {formatPrice(product.price)} {product.currency}
                      </span>
                      <span className="text-yellow-500">⭐ {product.rating}/5</span>
                      <span className="text-sm text-gray-500">موجودی: {product.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Table View */}
          {viewMode === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      نام محصول
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      دسته
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      فروشنده
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      توان
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      نور
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      قیمت
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      امتیاز
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      موجودی
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getCategoryName(product.categoryId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getSellerName(product.sellerId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.specs.wattage}W
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.specs.lumen.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {formatPrice(product.price)} {product.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                        {product.rating}/5
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
