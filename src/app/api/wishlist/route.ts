import { getAuthHeaders } from "@/lib/constants/api.constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const headers = await getAuthHeaders();
  const url = new URL(request.url);
  const propertyId = url.searchParams.get("propertyId");

  if (!headers.Authorization) {
    throw new Error("No token found");
  }

  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point/${propertyId}`, {
    headers: headers,
  });

  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}

export async function DELETE(request: Request) {
  const headers = await getAuthHeaders();
  const url = new URL(request.url);
  const propertyId = url.searchParams.get("propertyId");

  if (!headers.Authorization) {
    throw new Error("No token found");
  }

  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point/${propertyId}`, {
    method: "DELETE",
    headers: headers,
  });

  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
