/**
 * Health Check API Endpoint
 * Simple endpoint to check if the API is running
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      service: "Bitanoor Electric API",
    },
    { status: 200 }
  );
}

// Handle other methods
export async function POST() {
  return NextResponse.json(
    {
      success: true,
      message: "Health check endpoint only supports GET",
    },
    { status: 200 }
  );
}
