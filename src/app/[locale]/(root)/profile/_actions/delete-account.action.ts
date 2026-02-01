"use server";

import { getAuthHeaders } from "@/lib/constants/api.constants";
import { DeleteAccountFields } from "@/lib/schemas/profile.schema";

export async function DeleteAccountAction(fields: DeleteAccountFields) {
  // Get session

  const headers = await getAuthHeaders();

  if (!headers.Authorization) {
    throw new Error("You must be logged in to delete your account");
  }

  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/user/not-the-real-end-point`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(fields),
  });

  // Check if response has content before parsing JSON
  const text = await response.text();
  let payload: { message?: string } = {};

  // Only parse JSON if there's content
  if (text && text.trim()) {
    try {
      payload = JSON.parse(text);
    } catch (error) {
      // If JSON parsing fails but response is ok, treat as success
      if (response.ok) {
        return payload; // Return empty payload for success
      }
      // Return error message instead of throwing
      return { message: "Failed to delete account" };
    }
  }

  // Return payload with message (error or success)
  return payload;
}
