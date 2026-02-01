import { getBaseHeaders } from "@/lib/constants/api.constants";

export interface PropertyFilters {
  userId?: string | number;
  purpose?: "sell" | "rent";
  location?: string;
  type?: string;
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  cityId?: string;
  areaId?: string;
  rooms?: number[];
  bath_rooms?: number[];
  search?: string;
  page?: number;
  sort?: "price_asc" | "price_desc" | "date_asc" | "date_desc";
  sale_type?: "primary" | "resale";
}

export async function getAllProperties(filters?: PropertyFilters): Promise<AllPropertiesResponse> {
  try {
    const params = new URLSearchParams();
    const headers = await getBaseHeaders();

    if (!filters) {
      const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
        headers: headers,
      });

      if (!response.ok) {
        console.warn(`Failed to fetch properties: ${response.statusText}`);
      }

      return await response.json();
    }

    // Map filter keys to API parameter names
    const paramMap: Record<string, string> = {
      userId: "user_id",
      purpose: "purpose",
      location: "location",
      type: "type",
      min_price: "min_price",
      max_price: "max_price",
      min_area: "min_area",
      max_area: "max_area",
      cityId: "city_id",
      areaId: "area_id",
      search: "search",
      page: "page",
      sort: "sort",
      sale_type: "sale_type",
    };

    // Add all simple parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "rooms" && key !== "bath_rooms") {
        const paramName = paramMap[key] || key;
        params.append(paramName, String(value));
      }
    });

    // Handle array parameters
    if (filters.rooms?.length) {
      filters.rooms.forEach((room) => params.append("rooms[]", String(room)));
    }

    if (filters.bath_rooms?.length) {
      filters.bath_rooms.forEach((bathroom) => params.append("bath_rooms[]", String(bathroom)));
    }

    const queryString = params.toString();
    const url = `${process.env.APIS_URL}/properties${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      headers: headers,
    });

    if (!response.ok) {
      console.warn(`Failed to fetch properties: ${response.statusText}`);
    }

    const payload: AllPropertiesResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching properties", error);
    throw error as Error;
  }
}
