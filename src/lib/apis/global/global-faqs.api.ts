import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function getGlobalFAQs(): Promise<ApiGlobalFAQsResponse | undefined> {
  const headers = await getBaseHeaders();
  try {
    const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
      headers: headers,
    });

    if (!response.ok) {
      console.warn(`Failed to fetch FAQs: ${response.statusText}`);
    }

    const payload: ApiGlobalFAQsResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
  }
}
