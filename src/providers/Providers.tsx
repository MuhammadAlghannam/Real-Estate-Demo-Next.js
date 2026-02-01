import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from 'next-intl';
import { Toaster } from "sonner";
import ReactQueryProvider from "./_components/react-query.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Get the locale, now, and time zone from the client
  const locale = useLocale();
  const isArabic = locale === "ar";
  const now = useNow();
  const timeZone = useTimeZone();
  const messages = useMessages();

  return (
    <>
      <SessionProvider>
        <Toaster position={isArabic ? "bottom-left" : "bottom-right"} richColors />

        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages} locale={locale} now={now} timeZone={timeZone}>
            {children}
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </SessionProvider>
    </>
  )
}
