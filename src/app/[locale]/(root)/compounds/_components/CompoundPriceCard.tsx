"use client";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/helper";
import { useFormatter, useLocale, useTranslations } from "next-intl";

type CompoundPriceCardProps = {
  resaleStartPrice: number | null;
  primaryStartPrice: number | null;
};

export default function CompoundPriceCard({ resaleStartPrice, primaryStartPrice }: CompoundPriceCardProps) {
  const t = useTranslations("CompoundSinglePage.price-card");
  const format = useFormatter();
  const locale = useLocale();
  const isArabic = locale === "ar";

  return resaleStartPrice || primaryStartPrice ? (
    <div className="flex justify-between md:w-2/3 w-[96%] gap-6 items-center p-4 bg-white rounded-lg shadow-[0_10px_40px_0_rgba(24,26,32,0.08)] mx-auto -mt-8 z-10 relative">
      {/* resale start price */}
      {resaleStartPrice && (
        <div className={cn("border-border flex-1", isArabic ? "border-l" : "border-r")}>
          <h3 className="sm:text-h5-semibold md:text-h4-semibold text-h6-semibold text-black">
            {t("resale-start-price")}
          </h3>
          <p className="sm:text-h6-regular text-h7-regular text-text-gray-dark">
            {formatCurrency(resaleStartPrice, format)}
          </p>
        </div>
      )}

      {/* primary start price */}
      {primaryStartPrice && (
        <div className="flex-1">
          <h3 className="sm:text-h5-semibold md:text-h4-semibold text-h6-semibold text-black">
            {t("primary-start-price")}
          </h3>
          <p className="sm:text-h6-regular text-h7-regular text-text-gray-dark">
            {formatCurrency(primaryStartPrice, format)}
          </p>
        </div>
      )}
    </div>
  ) : null;
}


