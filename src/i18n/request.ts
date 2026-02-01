import { Formats, hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export const getFormats = (locale: (typeof routing.locales)[number]): Formats => {
  return {
    number: {
      digit: {
        numberingSystem: locale === "ar" ? "arab" : "latn",
      },
      currency: {
        style: "currency",
        currency: "EGP",
        numberingSystem: locale === "ar" ? "arab" : "latn",
        currencyDisplay: "symbol",
        maximumFractionDigits: 0,
      },
    },
    dateTime: {
      "full-date": {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric",
        numberingSystem: locale === "ar" ? "arab" : "latn",
      },
    },
  };
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    formats: getFormats(locale),
  };
});
