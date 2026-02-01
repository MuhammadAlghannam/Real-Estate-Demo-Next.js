import { auth } from "@/auth";
import { getAuthHeaders } from "@/lib/constants/api.constants";

export default async function getUserInfo(): Promise<ApiUser> {
  const session = await auth();

  const headers = await getAuthHeaders();

  if (!headers.Authorization) {
    throw new Error("No token found");
  }

  if (session?.error === "RefreshTokenExpiredError") {
    throw new Error("RefreshTokenExpiredError");
  }

  try {
    const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }

    const payload: { user: ApiUser } = await response.json();
    return payload.user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error as Error;
  }
}
