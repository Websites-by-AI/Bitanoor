/**
 * Catalog API Endpoint
 * Returns filtered list of lighting products
 */

import { NextRequest, NextResponse } from "next/server";
import { products, getFilteredProducts } from "@/data/catalog";

// GET /api/catalog - Get filtered list of products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract filter parameters
    const query = searchParams.get("q") || "";
    const categoryId = searchParams.get("category") || "";
    const sellerId = searchParams.get("seller") || "";
    const minPrice = parseInt(searchParams.get("minPrice") || "0");
    const maxPrice = parseInt(searchParams.get("maxPrice") || "Infinity");
    const isFeatured = searchParams.get("featured") === "true";
    const isNew = searchParams.get("new") === "true";
    const limit = parseInt(searchParams.get("limit") || "50");
    const format = searchParams.get("format") || "json";
    
    // Filter products
    let filteredProducts = getFilteredProducts(
      query,
      categoryId,
      sellerId,
      minPrice,
      maxPrice,
      isFeatured,
      isNew,
      limit
    );
    
    // Return CSV if requested
    if (format === "csv") {
      // Add UTF-8 BOM for Excel compatibility
      const bom = "\uFEFF";
      const csvHeader = [
        "ID",
        "Name",
        "Name (EN)",
        "Category",
        "Seller",
        "Wattage (W)",
        "Lumen (lm)",
        "Color Temp (K)",
        "Color",
        "Material",
        "IP Rating",
        "Voltage",
        "Price (IRR)",
        "Price (USD)",
        "Stock",
        "Rating",
        "Warranty",
        "Tags",
        "New",
        "Featured",
        "Available",
      ].join(",");
      
      const csvRows = filteredProducts.map((product) => [
        product.id,
        `"${product.name.replace(/"/g, '""')}"`,
        `"${product.nameEn.replace(/"/g, '""')}"`,
        product.categoryId,
        product.sellerId,
        product.specs.wattage,
        product.specs.lumen,
        product.specs.colorTemperature,
        product.specs.color,
        product.specs.material,
        product.specs.ipRating,
        product.specs.voltage,
        product.price,
        product.priceUsd || "",
        product.stock,
        product.rating,
        product.warranty,
        `"${product.tags.join("; ")}"`,
        product.isNew,
        product.isFeatured,
        product.isAvailable,
      ].join(","));
      
      const csvContent = bom + [csvHeader, ...csvRows].join("\n");
      
      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": "attachment; filename=bitanoor_catalog.csv",
        },
      });
    }
    
    // Return HTML if requested
    if (format === "html") {
      let html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>کاتالوگ محصولات بیتانور الکتریک</title>
  <style>
    body { font-family: 'Vazir', Tahoma, sans-serif; direction: rtl; text-align: right; padding: 20px; }
    h1 { text-align: center; color: #2563eb; }
    h2 { color: #1e40af; margin-top: 30px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 10px; text-align: right; border: 1px solid #e5e7eb; }
    th { background-color: #f9fafb; font-weight: bold; }
    tr:nth-child(even) { background-color: #f3f4f6; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
    @media print { body { font-size: 12px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">بیتانور الکتریک</div>
    <div>تاریخ: <span id="date"></span></div>
  </div>
  <h1>کاتالوگ محصولات چراغ‌های برقی</h1>
  <p>این کاتالوگ شامل مشخصات فنی ۵۰۰+ محصول نورپردازی از برندهای معتبر می‌باشد.</p>
  <h2>محصولات ویژه</h2>
  <table>
    <thead>
      <tr>
        <th>ردیف</th>
        <th>نام محصول</th>
        <th>دسته</th>
        <th>توان (W)</th>
        <th>نور (lm)</th>
        <th>قیمت (IRR)</th>
        <th>موجودی</th>
        <th>امتیاز</th>
      </tr>
    </thead>
    <tbody>
`;
      
      filteredProducts.forEach((product, index) => {
        html += `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.categoryId}</td>
        <td>${product.specs.wattage}</td>
        <td>${product.specs.lumen.toLocaleString()}</td>
        <td>${product.price.toLocaleString()}</td>
        <td>${product.stock}</td>
        <td>${product.rating}/5</td>
      </tr>
`;
      });
      
      html += `
    </tbody>
  </table>
  <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
    سامانه بیتانور الکتریک - کاتالوگ محصولات
  </p>
  <script>
    document.getElementById('date').textContent = new Date().toLocaleDateString('fa-IR');
    window.print();
  </script>
</body>
</html>`;
      
      return new NextResponse(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Disposition": "inline; filename=bitanoor_catalog.html",
        },
      });
    }
    
    // Return JSON
    return NextResponse.json(
      {
        success: true,
        data: filteredProducts,
        total: filteredProducts.length,
        filters: {
          query,
          categoryId,
          sellerId,
          minPrice,
          maxPrice,
          isFeatured,
          isNew,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in catalog API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch catalog",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed",
      message: "This endpoint only supports GET requests",
    },
    { status: 405 }
  );
}
