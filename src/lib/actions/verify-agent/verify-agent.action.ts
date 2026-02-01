"use server";

import { getBaseHeaders } from "@/lib/constants/api.constants";
import { VerifyAgentFields } from "@/lib/schemas/verify-agent.schema";

export async function VerifyAgentAction(fields: VerifyAgentFields) {
  const headers = await getBaseHeaders();
  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(fields),
  });

  // Parse payload
  const payload: VerifyAgentResponse = await response.json();

  return payload;
}
