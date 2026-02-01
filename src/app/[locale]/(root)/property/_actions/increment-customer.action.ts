"use server";

import { getBaseHeaders } from "@/lib/constants/api.constants";

export async function incrementCustomerAction(data: IncrementCustomerRequest) {
  const headers = await getBaseHeaders();
  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  //payload
  const payload: IncrementCustomerResponse = await response.json();

  return payload;
}
