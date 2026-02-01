"use server";

import { auth } from "@/auth";
import { getLocale } from "next-intl/server";

export async function updateProfileAction(formData: FormData) {
  // Get the user session to access the token
  const session = await auth();
  const locale = await getLocale();

  // API call
  const response = await fetch(`${process.env.APIS_URL}/user/not-the-real-end-point`, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${session?.token}`,
      "Accept-Language": locale,
    },
  });

  // Parse payload
  const payload: ProfileResponse = await response.json();

  return payload;
}
