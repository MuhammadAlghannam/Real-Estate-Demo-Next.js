import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function getSingleDeveloper(
  developerId: number | string,
): Promise<SingleDeveloperApiResponse | undefined> {
  const headers = await getBaseHeaders();
  try {
    const res = await fetch(`${process.env.APIS_URL}/not-the-real-end-point/${developerId}`, {
      headers: headers,
    });

    if (!res.ok) {
      console.warn(`Failed to fetch developer: ${res.statusText}`);
    }

    const payload: SingleDeveloperApiResponse = await res.json();
    return payload;
  } catch (error) {
    console.error("Error fetching single developer:", error);
  }
}
