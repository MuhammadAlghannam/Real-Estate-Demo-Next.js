import MeetOurTeam from "@/components/features/team/meet-our-team";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutUsWhyChooseUs from "./_components/about-us-why-choose-us";
import MissionVision from "./_components/mission-vission";
import OurAchievements from "./_components/our-achievements";
import OurServices from "./_components/our-services";
import WhereWeOperate from "./_components/where-we-operate";
import WhoWeAre from "./_components/who-we-are";

// Metadata
export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "AboutPage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {
  return (
    <>
      {/* Who we are */}
      <WhoWeAre />

      {/* Mission & Vision */}
      <MissionVision />

      {/* Services*/}
      <OurServices />

      {/* Why Choose us */}
      <AboutUsWhyChooseUs />

      {/* Our Achievements  */}
      <OurAchievements />

      {/* Team */}
      <MeetOurTeam />

      {/* Where We Operate */}
      <WhereWeOperate />
    </>

  )
}
