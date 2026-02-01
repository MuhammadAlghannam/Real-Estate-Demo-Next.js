import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowDownLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Suspense } from "react";
import OfferingsOppertunitiesList from "./OfferingsOppertunitiesList";

export default function OfferingsOppertunities() {

  // Translation
  const t = useTranslations("HomePage.offerings-opportunities");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-10 md:py-20 relative overflow-hidden">
      {/*  Image with line */}
      <div className={cn("absolute top-0 hidden lg:block", isArabic ? "left-0" : "right-0")}>
        <Image
          src="/images/home/oppertunities-vector.svg"
          alt={t("alt.background")}
          className={cn(isArabic && "scale-x-[-1]")}
          width={135}
          height={245}
        />
      </div>

      {/* Title */}
      <div className="container-1440">
        <h2 className="text-h3-semibold md:text-h2-semibold text-black">{t("title")}</h2>
        <h2 className="text-h3-regular md:text-h2-lightitalic text-primary italic">{t("subtitle")}</h2>
        <p className="md:text-h5-regular text-h6-regular text-black">{t("description")}</p>
      </div>

      {/* taps */}

      {/* Cards Carousel */}
      <div className="mt-6 container-1440">
        <div className={cn(
          isArabic
            ? "ml-[-32px] md:ml-[-64px] lg:ml-[-96px] xl:ml-[-144px]"
            : "mr-[-32px] md:mr-[-64px] lg:mr-[-96px] xl:mr-[-144px]"
        )}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <OfferingsOppertunitiesList />
          </Suspense>
        </div>
      </div>

      {/* View */}
      <div className="container-1440 flex justify-end mt-6">
        <Link
          href="/properties"
          className="inline-flex items-center gap-3 group transition-colors"
        >
          <p className="text-h6-semibold transition-colors duration-300 group-hover:text-primary">
            {t("see-all-properties")}
          </p>
          <ArrowDownLeft className={cn("text-black transition-all duration-300 group-hover:text-primary", isArabic ? "group-hover:rotate-90" : "group-hover:rotate-180")} />
        </Link>
      </div>
    </section>
  )
}
