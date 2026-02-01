import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function getDevelopers(): Promise<DeveloperResponse | undefined> {
  const headers = await getBaseHeaders();
  try {
    const res = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
      headers: headers,
    });
    if (!res.ok) {
      console.warn(`Failed to fetch developers: ${res.statusText}`);
    }
    const payload: DeveloperResponse = await res.json();
    return payload;
  } catch (error) {
    console.error("Error fetching developers:", error);
  }
}
