import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function SellingOption() {
  const t = useTranslations("HomePage.selling-option");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-10 md:py-20 flex flex-col gap-6 bg-muted">
      <div className="container-1440 flex flex-col lg:flex-row gap-4 items-center justify-center">

        {/* Left */}
        <div className="flex-1">

          {/* Titles */}
          <h2 className="sm:text-h1-semibold text-[28px] font-semibold text-black w-8/10">{t("title.prefix")} <span className="sm:text-h1-regular text-h3-regular text-primary italic">{t("title.middle")}
          </span></h2>
          <h3 className="sm:text-h1-regular text-h3-regular text-primary italic">
            {t("title.suffix")}</h3>
          <p className="text-h5-regular w-8/10 mb-6">{t("description")}</p>

          {/* Icons */}
          <div className="flex flex-col gap-6 mb-12">
            {/* 1st icon */}
            <div className="flex items-center gap-3.5">
              <div className="rounded-full bg-[#169A25] p-1">
                <Check className="text-white size-3" />
              </div>
              <p className="text-h6-semibold">{t("features.find-deals")}</p>
            </div>

            {/* 2nd icon */}
            <div className="flex items-center gap-3.5">
              <div className="rounded-full bg-[#169A25] p-1">
                <Check className="text-white size-3" />
              </div>
              <p className="text-h6-semibold">{t("features.friendly-support")}</p>
            </div>

            {/* 3rd icon */}
            <div className="flex items-center gap-3.5">
              <div className="rounded-full bg-[#169A25] p-1">
                <Check className="text-white size-3" />
              </div>
              <p className="text-h6-semibold">{t("features.list-property")}</p>
            </div>
          </div>

          {/* View */}
          <div className="flex items-center">
            <Link
              href="/properties"
              className="inline-flex items-center gap-3 group transition-colors"
            >
              <p className="text-h6-semibold transition-colors duration-300 group-hover:text-primary">
                {t("explore-more")}
              </p>
              <ArrowDownLeft className={cn("text-black transition-all duration-300 group-hover:text-primary", isArabic ? "group-hover:rotate-90" : "group-hover:rotate-180")} />
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1">
          <Image
            src="/images/home/selling-option2.png"
            alt={t("alt.background")}
            className={cn(isArabic && "scale-x-[-1]")}
            width={979}
            height={994}
          />
        </div>

      </div>
    </section>
  )
}
