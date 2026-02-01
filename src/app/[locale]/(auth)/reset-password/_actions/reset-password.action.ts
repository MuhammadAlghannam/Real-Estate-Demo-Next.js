"use server";

import { getBaseHeaders } from "@/lib/constants/api.constants";
import { ResetPasswordFields } from "@/lib/schemas/auth.schema";

interface ResetPasswordRequest extends ResetPasswordFields {
  email: string;
}

interface ResetPasswordResponse {
  message: string;
}

export async function ResetPasswordAction(data: ResetPasswordRequest) {
  const headers = await getBaseHeaders();
  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  //payload
  const payload: ResetPasswordResponse = await response.json();

  return payload;
}
