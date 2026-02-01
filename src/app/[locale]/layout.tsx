import { routing } from '@/i18n/routing';
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Poppins, Tajawal } from "next/font/google";
import { notFound } from 'next/navigation';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const tajawal = Tajawal({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LayoutMetadata' });

  return {
    title: {
      default: t('title.default'),
      template: t('title.template'),
    },
    description: t('description'),
    metadataBase: new URL("https://hansyrealestate.com"),
    alternates: {
      canonical: "/",
    },
    applicationName: t('application-name'),
    keywords: t.raw('keywords') as string[],
    authors: [{ name: t('authors.name') }],
    creator: t('creator'),
    publisher: t('publisher'),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      url: "/",
      siteName: t('open-graph.site-name'),
      title: t('open-graph.title'),
      description: t('open-graph.description'),
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/manifest.json",
    category: t('category'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      suppressHydrationWarning
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
    >
      <body
        className={`${locale === "ar" ? tajawal.className : poppins.className} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
