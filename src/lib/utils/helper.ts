import { format } from "date-fns";
import he from "he";

// To Formate Date
export function formatDate(dateStr: string | number | Date) {
  //  Added safe check (without modifying your structure)
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";

  return format(d, "d MMM, yyyy");
}

// Safely coerce any value to a string
export function coerceToString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

// No Link Image
export function noLinkImage(imagePath: string | null) {
  if (!imagePath || imagePath.trim() === "") {
    return "/images/global/avatar.svg";
  }

  // If the image path is already a full URL (starts with http:// or https://), return it as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Remove any leading slash to prevent double slashes in the URL
  const cleanImagePath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const baseUrl = "";

  // If the path starts with 'logo_path/', add '/storage/' prefix
  if (cleanImagePath.startsWith("logo_path/")) {
    return `${baseUrl}/storage/${cleanImagePath}`;
  }

  // Ensure there's no double slash between base URL and image path
  return `${baseUrl}/${cleanImagePath}`;
}

// Replace underscores with spaces and capitalize the first letter
export function prettifyLabel(input: unknown): string {
  const raw = coerceToString(input).trim();
  if (!raw) return "";
  const noUnderscores = raw.replace(/_/g, " ");
  return noUnderscores.charAt(0).toUpperCase() + noUnderscores.slice(1);
}

// Convert simple HTML to plain text: decode entities then strip tags
export function htmlToPlainText(input: unknown): string {
  const raw = coerceToString(input);
  if (!raw) return "";

  // Decode HTML entities (may need to decode twice if double-encoded)
  let decoded = he.decode(raw);
  // Check if still encoded and decode again
  if (decoded.includes("&lt;") || decoded.includes("&gt;") || decoded.includes("&amp;")) {
    decoded = he.decode(decoded);
  }

  // Strip all HTML tags
  const withoutTags = decoded.replace(/<[^>]*>/g, " ");

  // Clean up whitespace
  return withoutTags.replace(/\s+/g, " ").trim();
}

// Convert a plain object to FormData, supporting Files/Blobs and arrays
export function toFormData(input: Record<string, unknown>): FormData {
  const formData = new FormData();

  const appendValue = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;

    // Handle File/Blob objects
    if (value instanceof File || value instanceof Blob) {
      // Only append if file has content (size > 0)
      if (value.size > 0) {
        formData.append(key, value);
      }
      return;
    }

    // Handle arrays - use bracket notation so PHP/Laravel parses as arrays
    if (Array.isArray(value)) {
      const arrayKey = `${key}[]`;
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          if (item instanceof File || item instanceof Blob) {
            if (item.size > 0) {
              formData.append(arrayKey, item);
            }
          } else {
            formData.append(arrayKey, typeof item === "string" ? item : String(item));
          }
        }
      });
      return;
    }

    // Handle empty strings for optional fields
    if (typeof value === "string" && value.trim() === "") {
      return; // Skip empty strings
    }

    // Fallback to string conversion for primitives/objects
    formData.append(key, typeof value === "string" ? value : String(value));
  };

  Object.entries(input).forEach(([key, value]) => appendValue(key, value));

  return formData;
}

// Format currency with thousand separators and EGP suffix
// If formatter is provided (from next-intl), it will use locale-aware formatting with proper numbering system
export function formatCurrency(
  value: string | number | null | undefined,
  formatter?: { number: (value: number | bigint, format?: string) => string }
): string {
  if (value == null || value === "") return "—";

  // Convert to number
  const num = typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

  // Check if valid number
  if (isNaN(num) || !isFinite(num)) return "—";

  // Use formatter if provided (for locale-aware formatting with Arabic/Latin numerals)
  if (formatter) {
    return formatter.number(num, 'currency');
  }

  // Fallback to default formatting
  const formatted = num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${formatted} EGP`;
}