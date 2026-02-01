"use server";

import { getBaseHeaders } from "@/lib/constants/api.constants";
import { ForgetPasswordFields } from "@/lib/schemas/auth.schema";

interface ForgetPasswordResponse {
  message: string;
}

export async function ForgetPasswordAction(ForgetPasswordFields: ForgetPasswordFields) {
  const headers = await getBaseHeaders();
  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(ForgetPasswordFields),
  });

  //payload
  const payload: ForgetPasswordResponse = await response.json();

  return payload;
}
