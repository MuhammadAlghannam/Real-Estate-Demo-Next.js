import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function getCompounds(page: number = 1): Promise<CompoundResponse | undefined> {
  const headers = await getBaseHeaders();
  try {
    const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point?page=${page}`, {
      headers: headers,
    });

    if (!response.ok) {
      console.warn(`Failed to fetch compounds: ${response.statusText}`);
    }

    const payload: CompoundResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching compounds:", error);
  }
}
