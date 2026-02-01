import MeetOurTeam from "@/components/features/team/meet-our-team";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FAQs from "./_components/faqs";
import HansyApp2 from "./_components/hansy-app-2";
import OurLocation from "./_components/our-location";
import YourDream from "./_components/your-dream";

// Metadata
export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "OurAgentsPage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {

  return (
    <>
      {/* 1st section */}
      <YourDream />

      {/* FAQs */}
      <FAQs />

      {/* Our Team */}
      <MeetOurTeam />

      {/* Our Location */}
      <OurLocation />

      {/* Hansy App */}
      <HansyApp2 />
    </>
  )
}
