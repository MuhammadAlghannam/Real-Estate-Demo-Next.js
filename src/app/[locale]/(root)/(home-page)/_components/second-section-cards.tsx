import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function SecondSectionCards() {
  const t = useTranslations("HomePage.second-section-cards");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="container-1440 py-10 md:py-20">

      {/* Scroll */}
      <Link href="#second-section" className="flex items-center gap-3.5 justify-center mb-6">
        <p className="text-h5-regular text-black scroll-smooth">{t("scroll-now")}</p>
        <Image
          src="/images/home/scroll-down.svg"
          alt={t("alt.scroll")}
          width={14}
          height={20}
          className="animate-bounce"
        />
      </Link>

      {/* Cards */}
      <div id="second-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

        {/* 1st card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-center text-center">
          {/* Icon */}
          <div className="rounded-full p-2.5 border border-primary">
            <div className="rounded-full p-3.5 border border-primary">
              <Image src="/images/home/home.svg" alt={t("alt.home")} width={34} height={34} />
            </div>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black">{t("cards.find-dream-home")}</p>
        </div>

        {/* 2nd card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-center text-center">
          {/* Icon */}
          <div className="rounded-full p-2.5 border border-primary">
            <div className="rounded-full p-3.5 border border-primary">
              <Image src="/images/home/cash.svg" alt={t("alt.cash")} width={34} height={34} />
            </div>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black">{t("cards.unlock-property-value")}</p>
        </div>

        {/* 3rd card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-center text-center">
          {/* Icon */}
          <div className="rounded-full p-2.5 border border-primary">
            <div className="rounded-full p-3.5 border border-primary">
              <Image src="/images/home/building.svg" alt={t("alt.building")} width={34} height={34} />
            </div>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black">{t("cards.effortless-property-management")}</p>
        </div>

        {/* 4th card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-center text-center">
          {/* Icon */}
          <div className="rounded-full p-2.5 border border-primary">
            <div className="rounded-full p-3.5 border border-primary">
              <Image src="/images/home/sun.svg" alt={t("alt.sun")} width={34} height={34} />
            </div>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black">{t("cards.smart-investments")}</p>
        </div>

      </div>
    </section>
  )
}
