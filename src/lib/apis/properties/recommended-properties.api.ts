import { auth } from "@/auth";
import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function getRecommendedProperties(): Promise<RecommendedPropertiesResponse> {
  const session = await auth();
  const userId = session?.user?.id;
  const headers = await getBaseHeaders();

  try {
    const params = new URLSearchParams();

    if (userId) {
      params.append("user_id", String(userId));
    }

    const response = await fetch(`${process.env.APIS_URL}?${params.toString()}`, {
      headers: headers,
    });

    const payload: RecommendedPropertiesResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching recommended properties", error);
    throw error as Error;
  }
}
