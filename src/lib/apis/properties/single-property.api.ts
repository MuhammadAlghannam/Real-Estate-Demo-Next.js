import { auth } from "@/auth";
import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function singleProperty(slug: string): Promise<SinglePropertyResponse> {
  const session = await auth();
  const userId = session?.user?.id;
  const headers = await getBaseHeaders();

  try {
    const params = new URLSearchParams();

    if (userId) {
      params.append("user_id", String(userId));
    }

    const queryString = params.toString();
    const url = `${process.env.APIS_URL}/not-the-real-end-point/${slug}${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      headers: headers,
    });
    const payload: SinglePropertyResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching property", error);
    throw error as Error;
  }
}
