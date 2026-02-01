import { getBaseHeaders } from "@/lib/constants/api.constants";

type ApiPrivacyPolicyResponse = {
  privacyPolicy: string;
};

export async function getPrivacyPolicy(): Promise<ApiPrivacyPolicyResponse | undefined> {
  const headers = await getBaseHeaders();
  try {
    const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
      headers: headers,
    });

    if (!response.ok) {
      console.warn(`Failed to fetch Privacy Policy: ${response.statusText}`);
      return;
    }

    const payload: ApiPrivacyPolicyResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
  }
}
