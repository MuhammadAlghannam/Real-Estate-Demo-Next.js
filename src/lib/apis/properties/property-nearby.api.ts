import { auth } from "@/auth";
import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function propertyNearby({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<NearbyPropertiesResponse> {
  const session = await auth();
  const userId = session?.user?.id;
  const headers = await getBaseHeaders();

  try {
    const params = new URLSearchParams();
    params.append("lat", String(lat));
    params.append("lng", String(lng));

    if (userId) {
      params.append("user_id", String(userId));
    }

    const response = await fetch(
      `${process.env.APIS_URL}/not-the-real-end-point?${params.toString()}`,
      {
        headers: headers,
      },
    );
    const payload: NearbyPropertiesResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching property", error);
    throw error as Error;
  }
}
