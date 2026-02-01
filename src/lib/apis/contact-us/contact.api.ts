import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function getContactUs(): Promise<ContactUsPageResponse | undefined> {
  const headers = await getBaseHeaders();
  try {
    const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
      headers: headers,
    });

    if (!response.ok) {
      console.warn(`Failed to fetch contact us data: ${response.statusText}`);
    }

    const payload: ContactUsPageResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching contact us data:", error);
  }
}
