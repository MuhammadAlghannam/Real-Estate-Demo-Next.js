"use server";

import { getAuthHeaders } from "@/lib/constants/api.constants";
import { ScheduleVisitFields } from "@/lib/schemas/schedule-visit.schema";

export async function ScheduleVisitAction(fields: ScheduleVisitFields) {
  // Get the user session to access the token

  const headers = await getAuthHeaders();

  if (!headers.Authorization) {
    throw new Error("You must be logged in to schedule a visit");
  }

  // Make the API call to your backend
  const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(fields),
  });

  // Parse payload
  const payload: { message?: string } = await response.json();

  return payload;
}
