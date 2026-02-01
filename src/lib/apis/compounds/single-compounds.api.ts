import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function singleCompound(compoundId: string): Promise<SingleCompoundResponse> {
  const headers = await getBaseHeaders();
  try {
    const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point/${compoundId}`, {
      headers: headers,
    });
    const payload: SingleCompoundResponse = await response.json();

    return payload;
  } catch (error) {
    console.error("Error fetching compound", error);
    throw error as Error;
  }
}
