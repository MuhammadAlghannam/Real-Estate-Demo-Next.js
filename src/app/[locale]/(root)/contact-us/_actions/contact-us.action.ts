"use server";

import { getBaseHeaders } from "@/lib/constants/api.constants";
import { ContactUsFields } from "@/lib/schemas/contact-us.schema";

export async function ContactUsAction(fields: ContactUsFields) {
  const headers = await getBaseHeaders();
  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(fields),
  });

  // Parse payload
  const payload: ContactUsResponse = await response.json();

  return payload;
}
