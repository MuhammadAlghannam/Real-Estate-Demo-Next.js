import Empty from "@/components/shared/Empty";
import { getTopDevelopers } from "@/lib/apis/developers/top-developers.api";
import { getTranslations } from "next-intl/server";
import TopDevelopersSlider from "./top-developers-slider";

export default async function TopDevelopersSliderServer() {
  const t = await getTranslations("HomePage.top-developers");

  // Fetch developers
  const developers = await getTopDevelopers();

  // Graceful empty/error state (keeps the rest of the page working)
  if (!developers?.data || developers.data.length === 0) return <Empty>{t("empty-state")}</Empty>;

  return <TopDevelopersSlider developers={developers} />;
}
