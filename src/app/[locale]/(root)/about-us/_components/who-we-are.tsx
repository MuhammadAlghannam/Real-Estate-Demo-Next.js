import { useTranslations } from "next-intl";

export default function WhoWeAre() {

  // Translation
  const t = useTranslations("AboutPage.who-we-are");

  return (
    <section className="py-10 md:py-20 flex flex-col gap-6 bg-[url('/images/about-us/about-us-bg.png')] bg-no-repeat bg-cover">
      {/* Title */}
      <div className="text-center container-1440">
        <h2 className="text-h3-semibold md:text-h2-semibold text-white mb-1">{t("title")}</h2>
        <p className="text-h6-regular text-white w-full md:w-8/10 mx-auto">
          {t("description.part1")} <strong>{t("description.brand")}</strong> {t("description.part2")} <br /> <strong>{t("description.brand")}</strong> {t("description.part3")}<br /> <strong>{t("description.brand")}</strong> {t("description.part4")}</p>
      </div>
    </section>
  )
}
