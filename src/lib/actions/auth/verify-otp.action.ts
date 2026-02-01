"use server";

import { getBaseHeaders } from "@/lib/constants/api.constants";
import { UserVerificationTokenFields } from "@/lib/schemas/auth.schema";

export async function VerifyOTP(UserVerificationTokenFields: UserVerificationTokenFields) {
  const headers = await getBaseHeaders();
  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(UserVerificationTokenFields),
  });

  //payload
  const payload = await response.json();

  return payload;
}
