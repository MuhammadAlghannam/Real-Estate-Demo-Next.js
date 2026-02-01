import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function HansyCircle() {
  // Translation
  const t = useTranslations("HansyCirclePage.hansy-circle");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="relative py-10 md:py-20 bg-[url('/images/hancy-circle/hanasy-circle-bg.png')] bg-no-repeat bg-cover bg-center h-auto md:min-h-[480px] overflow-hidden">
      <div className="container-1440">

        {/* Fixed-position Circle */}
        <div className={cn("absolute top-0 z-0 hidden md:block ", isArabic ? "left-0" : "right-0 scale-x-[-1]")}>
          <Image
            src="/images/hancy-circle/circle.png"
            alt={t("alt.circle")}
            width={1920}
            height={900}
            className="w-100 lg:w-[1000px] h-auto"
          />
        </div>

        {/* Titles */}
        <div className="relative z-10">
          <h2 className="sm:text-h1-semibold text-[28px] font-semibold text-black">
            {t("title.part1")}
            <span className="sm:text-h1-semibold text-h3-semibold text-black md:text-black">
              {t("title.part2")}
            </span>
          </h2>
          <h3 className="sm:text-h1-regular text-h3-regular text-primary italic">
            {t("subtitle")}
          </h3>
          <p className="text-h5-regular">
            {t("description.part1")}
          </p>
          <p className="text-h5-regular">
            {t("description.part2")}
          </p>
        </div>
      </div>
    </section>
  )
}
