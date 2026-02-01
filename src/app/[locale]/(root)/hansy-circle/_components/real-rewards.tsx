import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from 'next/image';

export default function RealRewards() {
  // Translation
  const t = useTranslations("HansyCirclePage.real-rewards");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-10 md:py-20 flex flex-col gap-6 bg-muted">
      <div className="container-1440 flex flex-col lg:flex-row gap-4 items-center justify-center">

        {/* Left */}
        <div className="flex-2">

          {/* Titles */}
          <h3 className="sm:text-h1-regular text-h3-regular text-primary italic">
            {t("title")}</h3>
          <h2 className="sm:text-h1-semibold text-[28px] font-semibold text-black mb-6">{t("subtitle")}</h2>


          {/* Card */}
          <div className={cn("grid grid-cols-1 md:grid-cols-3 bg-white items-center rounded-xl relative  lg:z-10", isArabic ? "ml-0 lg:-ml-20" : "mr-0 lg:-mr-20")}>
            {/* 1st card */}
            <div className="flex flex-col gap-6 p-8 rounded-xl shadow-[0_7.475px_29.901px_0_rgba(24,26,32,0.05)]">

              {/* Icon */}
              <div>
                <Image src="/images/hancy-circle/icon-7.svg" alt={t("cards.card1.alt")} width={48} height={48} />
              </div>

              {/* Titles */}
              <div>
                <p className="text-h6-semibold">{t("cards.card1.title")}</p>
                {/* <p className="text-h6-regular">Lorem ipsum dolor sit amet consectetur.</p> */}
              </div>

            </div>

            {/* 2nd card */}
            <div className="flex flex-col gap-6 p-8 rounded-xl shadow-[0_7.475px_29.901px_0_rgba(24,26,32,0.05)]">

              {/* Icon */}
              <div>
                <Image src="/images/hancy-circle/icon-8.svg" alt={t("cards.card2.alt")} width={48} height={48} />
              </div>

              {/* Titles */}
              <div>
                <p className="text-h6-semibold">{t("cards.card2.title")}</p>
                {/* <p className="text-h6-regular">Lorem ipsum dolor sit amet consectetur.</p> */}
              </div>

            </div>

            {/* 3rd card */}
            <div className="flex flex-col gap-6 p-8 rounded-xl shadow-[0_7.475px_29.901px_0_rgba(24,26,32,0.05)]">

              {/* Icon */}
              <div>
                <Image src="/images/hancy-circle/icon-9.svg" alt={t("cards.card3.alt")} width={48} height={48} />
              </div>

              {/* Titles */}
              <div>
                <p className="text-h6-semibold">{t("cards.card3.title")}</p>
                {/* <p className="text-h6-regular">Lorem ipsum dolor sit amet consectetur.</p> */}
              </div>

            </div>

          </div>
        </div>

        {/* Right */}
        <div className="flex-2">
          <Image
            src="/images/hancy-circle/4th-section-bg.png"
            alt={t("alt.background")}
            width={979}
            height={994}
          />
        </div>

      </div>
    </section>
  )
}
