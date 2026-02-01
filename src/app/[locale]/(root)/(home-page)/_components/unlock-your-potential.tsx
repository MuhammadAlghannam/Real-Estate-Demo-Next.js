import CustomeBtn from "@/components/shared/CustomeBtn";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function UnlockYourPotential() {
  const t = useTranslations("HomePage.unlock-your-potential");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-10 md:py-20 flex flex-col gap-6 relative overflow-hidden">

      {/*  Image */}
      <div className={cn("absolute top-13  w-[150px] before:z-10 py-20 hidden lg:block", isArabic ? "right-0" : "left-0")}>
        <Image
          src="/images/home/unlock-your-potential-image.png"
          alt={t("alt.background")}
          className={cn("absolute top-0 opacity-90 pointer-events-none select-none z-0", isArabic ? "right-0 scale-x-[-1]" : "left-0")}
          width={100}
          height={100}
        />
      </div>

      {/* Title */}
      <div className="text-center container-1440">
        <h2 className="text-h3-semibold md:text-h2-semibold text-black mb-1">{t("title")}</h2>
        <p className="text-h6-regular text-text-black w-full lg:w-6/10 mx-auto">
          {t("description.prefix")} <strong>{t("description.brand")}</strong> {t("description.text")}</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch container-1440">

        {/* 1st card */}
        <div className="flex flex-col gap-2 py-10 px-5 rounded-lg border border-border items-center group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5">
            <p className="text-5xl">🧭</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors text-center">{t("cards.expert-guidance.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors text-center">{t("cards.expert-guidance.description")}</p>
        </div>

        {/* 2nd card */}
        <div className="flex flex-col gap-2 py-10 px-5 rounded-lg border border-border items-center group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5">
            <p className="text-5xl">🎯</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors text-center">{t("cards.tailored-solutions.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors text-center">{t("cards.tailored-solutions.description")}</p>
        </div>

        {/* 3rd card */}
        <div className="flex flex-col gap-2 py-10 px-5 rounded-lg border border-border items-center group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5">
            <p className="text-5xl">🛠️</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors text-center">{t("cards.comprehensive-service.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors text-center">{t("cards.comprehensive-service.description")}</p>
        </div>

        {/* 4th card */}
        <div className="flex flex-col gap-2 py-10 px-5 rounded-lg border border-border items-center group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5">
            <p className="text-5xl">📍</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors text-center">{t("cards.global-reach.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors text-center">{t("cards.global-reach.description")}</p>
        </div>

      </div>

      {/* Button */}
      <CustomeBtn href="/contact-us" className="w-fit mx-auto py-7">{t("contact-us-now")}</CustomeBtn>

      {/*  Underline */}
      <div className={cn("absolute bottom-0 w-[150px] before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-[600px] before:h-[6px] before:bg-black before:z-10 hidden lg:block", isArabic ? "left-0 scale-x-[-1]" : "right-0")}></div>

    </section>
  )
}
