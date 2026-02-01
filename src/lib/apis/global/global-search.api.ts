import { auth } from "@/auth";
import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function getGlobalSearch(search: string): Promise<GlobalSearchResponse | undefined> {
  const session = await auth();
  const userId = session?.user?.id;
  const headers = await getBaseHeaders();

  try {
    const params = new URLSearchParams();
    params.append("search", search);

    if (userId) {
      params.append("user_id", String(userId));
    }

    const res = await fetch(`${process.env.APIS_URL}/search?${params.toString()}`, {
      headers: headers,
    });

    if (!res.ok) {
      console.warn(`Failed to fetch global search results: ${res.statusText}`);
    }

    const payload: GlobalSearchResponse = await res.json();

    return payload;
  } catch (error) {
    console.error("Error fetching global search results:", error);
  }
}
