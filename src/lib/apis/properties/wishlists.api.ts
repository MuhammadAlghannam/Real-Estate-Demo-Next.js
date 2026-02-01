import { auth } from "@/auth";
import { getAuthHeaders } from "@/lib/constants/api.constants";

export async function getWishlistedProperties(page: number = 1): Promise<WishlistResponse> {
  const session = await auth();
  const headers = await getAuthHeaders();

  if (!headers.Authorization) {
    throw new Error("No token found");
  }

  if (session?.error === "RefreshTokenExpiredError") {
    throw new Error("RefreshTokenExpiredError");
  }

  try {
    const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point?page=${page}`, {
      cache: "no-store",
      headers: headers,
    });
    const payload: WishlistResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching Wishlisted Properties", error);
    throw error as Error;
  }
}
