import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function getCompoundsProperties({
  compoundId,
  page,
  saleType,
}: {
  compoundId: string;
  page: number;
  saleType?: string;
}): Promise<CompoundPropertiesResponse | undefined> {
  const headers = await getBaseHeaders();
  try {
    let url = `${process.env.APIS_URL}/not-the-real-end-point?compound_id=${compoundId}&page=${page}`;

    if (saleType) {
      url += `&sale_type=${saleType}`;
    }

    const response = await fetch(url, {
      headers: headers,
    });

    if (!response.ok) {
      console.warn(`Failed to fetch compound properties: ${response.statusText}`);
    }

    const payload: CompoundPropertiesResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching compound properties:", error);
  }
}
