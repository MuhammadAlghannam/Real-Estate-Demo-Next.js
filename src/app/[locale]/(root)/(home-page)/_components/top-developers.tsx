import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowDownLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Suspense } from "react";
import TopDevelopersSliderServer from "./top-developers-slider-server";

export default function TopDevelopers() {
  const t = useTranslations("HomePage.top-developers");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-10 md:py-20 flex flex-col gap-6 overflow-x-hidden">
      {/* Title */}
      <div className="text-center container-1440">
        <h2 className="text-h3-semibold md:text-h2-semibold text-black mb-1">{t("title")}</h2>
        <p className="text-h6-regular text-text-black w-full md:w-6/8 mx-auto">
          <b>{t("description.brand")}</b> {t("description.text")}
        </p>
      </div>

      {/* Slider with Suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <TopDevelopersSliderServer />
      </Suspense>

      {/* View All */}
      <div className="container-1440 flex justify-end mt-6">
        <Link
          href="/developers"
          className="inline-flex items-center gap-3 group transition-colors"
        >
          <p className="text-h6-semibold transition-colors duration-300 group-hover:text-primary">
            {t("view-all")}
          </p>
          <ArrowDownLeft className={cn("text-black transition-all duration-300 group-hover:text-primary", isArabic ? "group-hover:rotate-90" : "group-hover:rotate-180")} />
        </Link>
      </div>
    </section>
  );
}
