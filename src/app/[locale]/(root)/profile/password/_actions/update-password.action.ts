"use server";

import { getAuthHeaders } from "@/lib/constants/api.constants";
import { UpdatePasswordFields } from "@/lib/schemas/profile.schema";

export async function UpdatePasswordAction(data: UpdatePasswordFields) {
  const headers = await getAuthHeaders();

  if (!headers.Authorization) {
    throw new Error("You must be logged in to update your password");
  }

  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/user/not-the-real-end-point`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  //payload
  const payload: UpdatePasswordResponse = await response.json();

  return payload;
}
