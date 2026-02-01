import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AppDownload from "./_components/app-download";
import FAQs from "./_components/faqs";
import HansyCircle from "./_components/hansy-circle";
import RealRewards from "./_components/real-rewards";
import Requirements from "./_components/requirements";
import WhatHansyCircle from "./_components/what-hansy-circle";

// Metadata
export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "HansyCirclePage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {
  return (
    <>
      {/* 1st section */}
      <HansyCircle />

      {/* 2nd section */}
      <WhatHansyCircle />

      {/* 3rd section */}
      <Requirements />

      {/* 4th section */}
      <RealRewards />

      {/* 5th section */}
      <FAQs />

      {/* App download */}
      <AppDownload />

    </>
  );
}
