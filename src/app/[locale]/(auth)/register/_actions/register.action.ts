"use server";

import { getBaseHeaders } from "@/lib/constants/api.constants";
import { RegisterFields } from "@/lib/schemas/auth.schema";

export async function RegisterAction(RegisterFields: RegisterFields) {
  const headers = await getBaseHeaders();
  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(RegisterFields),
  });

  //payload
  const payload: RegisterResponse = await response.json();

  return payload;
}
