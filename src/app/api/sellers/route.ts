/**
 * Sellers API Endpoint
 * Returns filtered list of lighting product sellers
 */

import { NextRequest, NextResponse } from "next/server";
import { allSellers, getFilteredSellers, sellerFilters } from "@/data/sellers";

// GET /api/sellers - Get filtered list of sellers
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract filter parameters
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") as sellerFilters["type"] || "";
    const productionType = searchParams.get("productionType") as sellerFilters["productionType"] || "";
    const country = searchParams.get("country") || "";
    const catalogOnly = searchParams.get("catalog") === "true";
    const scope = searchParams.get("scope") as "iran" | "world" | "" || "";
    const format = searchParams.get("format") || "json";
    const limit = parseInt(searchParams.get("limit") || "50");
    
    // Filter sellers
    let filteredSellers = getFilteredSellers(
      query,
      type,
      productionType,
      country,
      catalogOnly,
      scope
    );
    
    // Apply limit
    filteredSellers = filteredSellers.slice(0, limit);
    
    // Return CSV if requested
    if (format === "csv") {
      const csvHeader = [
        "ID",
        "Name",
        "Name (EN)",
        "Type",
        "City",
        "Phone",
        "Email",
        "Website",
        "Products",
        "Priority",
        "Rating",
        "Price/Lumen",
        "Unit Cost",
        "Bulk Saving %",
        "Catalog",
        "Verified",
        "Featured",
        "Country",
      ].join(",");
      
      const csvRows = filteredSellers.map((seller) => [
        seller.id,
        `"${seller.name.replace(/"/g, '""')}"`,
        `"${seller.nameEn.replace(/"/g, '""')}"`,
        seller.type,
        seller.location.city,
        seller.contact.phone,
        seller.contact.email,
        seller.contact.website || "",
        `"${seller.products.join("; ")}"`,
        seller.leadPriority,
        seller.rating,
        seller.samplePricePerLumen,
        seller.unitCostEstimate,
        seller.bulkSavingPercent,
        seller.catalogAvailable,
        seller.isVerified,
        seller.isFeatured,
        seller.country,
      ].join(","));
      
      const csvContent = [csvHeader, ...csvRows].join("\n");
      
      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": "attachment; filename=bitanoor_sellers.csv",
        },
      });
    }
    
    // Return JSON
    return NextResponse.json(
      {
        success: true,
        data: filteredSellers,
        total: filteredSellers.length,
        filters: {
          query,
          type,
          productionType,
          country,
          catalogOnly,
          scope,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sellers API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch sellers",
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
