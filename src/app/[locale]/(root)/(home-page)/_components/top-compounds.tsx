import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowDownLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Suspense } from "react";
import CompoundsList from "./top-compounds-list";

export default function TopCompounds() {
  const t = useTranslations("HomePage.top-compounds");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="container-1440">
      <div className="border-t border-border py-10 md:py-20">
        {/* Title */}
        <h2 className="text-h3-semibold md:text-h2-semibold text-black mb-1 text-center md:text-start">
          {t("title")}
        </h2>
        <p className="text-h6-regular text-text-black text-center md:text-start">
          {t("description")}
        </p>

        {/* Compounds */}
        <Suspense fallback={<LoadingSpinner />}>
          <CompoundsList />
        </Suspense>

        {/* View All */}
        <div className="flex justify-end mt-6">
          <Link
            href="/compounds"
            className="inline-flex items-center gap-3 group transition-colors"
          >
            <p className="text-h6-semibold transition-colors duration-300 group-hover:text-primary">
              {t("view-all")}
            </p>
            <ArrowDownLeft className={cn("text-black transition-all duration-300 group-hover:text-primary", isArabic ? "group-hover:rotate-90" : "group-hover:rotate-180")} />
          </Link>
        </div>
      </div>
    </section>
  );
}
