// lib/constants/api.constants.ts
import { auth } from "@/auth";
import { getLocale } from "next-intl/server";

/**
 * Base headers for public APIs (includes Locale)
 */
export async function getBaseHeaders() {
  const locale = await getLocale();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": locale,
  };
}

/**
 * Authenticated headers (includes Locale + Bearer Token)
 */
export async function getAuthHeaders() {
  const [base, session] = await Promise.all([getBaseHeaders(), auth()]);

  return {
    ...base,
    ...(session?.token && { Authorization: `Bearer ${session.token}` }),
  };
}