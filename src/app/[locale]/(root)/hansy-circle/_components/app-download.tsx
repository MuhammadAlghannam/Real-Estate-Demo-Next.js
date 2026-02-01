import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";


export default function AppDownload() {
  // Translation
  const t = useTranslations("HansyCirclePage.app-download");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="container-1440 pb-20 pt-20 lg:pt-50">
      <div className="flex items-center lg:items-end lg:flex-row flex-col bg-gradient-to-r from-[#B12028] to-[#4B0E11] rounded-2xl">

        <div className="w-full lg:w-1/2 md:p-10 p-6">

          <h2 className="md:text-h3-semibold text-h4-semibold text-center lg:text-start text-white">
            {t("title.part1")}
          </h2>
          <h3 className="md:text-h3-semibold text-h4-semibold text-center lg:text-start text-white">
            {t("title.part2")}
          </h3>
          <p className="md:text-h3-regular text-h4-regular italic text-center lg:text-start text-white" >{t("subtitle")}</p>

          <div className="flex justify-center lg:justify-start gap-1.5 pt-4">
            <Link
              href="https://apps.apple.com/us/app/hansy/id6755159172"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/badges/apple-store.svg"
                alt={t("alt.app-store")}
                width={155}
                height={49}
                quality={75}
                className="w-[155px] h-[49px]"
              />
            </Link>

            <Link
              href="https://play.google.com/store/apps/details?id=com.mediacreation.hansyrealestat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/badges/google-play.svg"
                alt={t("alt.google-play")}
                width={155}
                height={49}
                quality={75}
                className="w-[155px] h-[49px]"
              />
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <Image
            src={"/images/hancy-circle/hansy-app2.png"}
            alt={t("alt.mobile-app")}
            width={1050}
            height={350}
            className={cn("w-[750px] lg:absolute block bottom-0 shrink h-auto", isArabic ? "left-0 scale-x-[-1]" : "right-0")}

            priority
          />
        </div>
      </div>
    </div>
  )
}
