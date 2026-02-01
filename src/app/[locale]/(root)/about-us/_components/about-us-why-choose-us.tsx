import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutUsWhyChooseUs() {

  // Translation
  const t = useTranslations("AboutPage.why-choose-us");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-10 md:py-20 flex flex-col gap-6 relative overflow-hidden">

      {/* Image alone on the left */}
      <div className={cn(
        "absolute top-0 w-[150px] hidden md:block",
        isArabic ? "right-0" : "left-0"
      )}>
        <Image
          src="/images/about-us/left-building.png"
          alt={t("alt")}
          className={cn(
            "absolute top-0 opacity-90 pointer-events-none select-none z-0",
            isArabic ? "right-0 scale-x-[-1]" : "left-0"
          )}
          width={100}
          height={100}
        />
      </div>

      {/* Line stays on the right */}
      <div className={cn(
        "absolute top-0 w-[150px] hidden md:block",
        "before:content-[''] before:absolute before:top-0 before:w-[900px] before:h-[6px] before:bg-black before:z-10",
        isArabic
          ? "left-20 before:right-[-400px]"
          : "right-20 before:left-[-400px]"
      )} />

      {/* Title */}
      <div className="text-center container-1440">
        <h2 className="text-h3-semibold md:text-h2-semibold text-black mb-1">{t("title")}</h2>
        <p className="text-h6-regular text-text-black w-full md:w-3/4 mx-auto">
          {t("description")}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch container-1440">

        {/* 1st card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">🏆</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">{t("cards.local-expertise.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">{t("cards.local-expertise.description")}</p>
        </div>

        {/* 2nd card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">👥</p>
          </div>
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">{t("cards.professional-team.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">{t("cards.professional-team.description")}</p>
        </div>

        {/* 3rd card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">⭐</p>
          </div>
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">{t("cards.high-success-rate.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">{t("cards.high-success-rate.description")}</p>
        </div>

        {/* 4th card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">🤝</p>
          </div>
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">{t("cards.personalized-approach.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">{t("cards.personalized-approach.description")}</p>
        </div>

        {/* 5th card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">⚙️</p>
          </div>
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">{t("cards.tech-driven-tools.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">{t("cards.tech-driven-tools.description")}</p>
        </div>

      </div>

    </section>
  );
}
