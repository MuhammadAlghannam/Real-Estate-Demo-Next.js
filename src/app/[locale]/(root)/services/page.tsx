import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HelpYou from "./_componenets/help-you";
import OurServices from "./_componenets/our-services";
import ServicesHansyApp from "./_componenets/services-hansy-app";

// Metadata
export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "ServicesPage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {
  return (
    <>
      {/* Our Services  */}
      <OurServices />

      {/* Help you */}
      <HelpYou />

      {/* App Download */}
      <ServicesHansyApp />
    </>
  )
}
