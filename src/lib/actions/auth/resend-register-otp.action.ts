"use server";

import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function ResendRegisterOtp(email: string) {
  const headers = await getBaseHeaders();
  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email: email }),
  });

  //payload
  const payload = await response.json();

  return payload;
}
