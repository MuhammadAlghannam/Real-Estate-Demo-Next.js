import { getBaseHeaders } from "@/lib/constants/api.constants";
import { NextResponse } from "next/server";

export async function GET() {
  const headers = await getBaseHeaders();
  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
    headers: headers,
  });

  const payload: PropertyStatusResponse = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
