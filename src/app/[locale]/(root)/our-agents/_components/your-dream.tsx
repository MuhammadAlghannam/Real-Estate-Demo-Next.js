import { useTranslations } from "next-intl";

export default function YourDream() {
  // Translation
  const t = useTranslations("OurAgentsPage.your-dream");

  return (
    <section className="py-10 md:py-20 bg-[url('/images/our-agents/white-geometrical.png')] bg-no-repeat bg-cover bg-center">
      <div className="container-1440 flex items-center justify-center gap-1 flex-col text-start md:text-center">

        {/* Titles */}
        <h2 className="text-h4-regular text-primary">
          {t("title")}
        </h2>
        <h3 className="sm:text-h2-semibold text-h3-semibold text-black" >
          {t("subtitle")}
        </h3>
        <p className="text-h6-regular w-full md:w-7/10">
          {t("description.part1")} <b>{t("description.brand")}</b>{t("description.part2")}
        </p>
      </div>
    </section>
  )
}
