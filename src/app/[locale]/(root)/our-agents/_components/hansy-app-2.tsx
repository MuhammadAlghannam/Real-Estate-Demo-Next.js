import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function HansyApp2() {
  // Translation
  const t = useTranslations("OurAgentsPage.hansy-app-2");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className={cn("py-10 md:py-15 my-10 md:my-20 bg-[url('/images/our-agents/hansy-app2.png')] bg-no-repeat bg-cover container-1440 shadow-[0_10px_40px_0_rgba(24,26,32,0.08)] rounded-xl", isArabic && "scale-x-[-1]")}>

      <div className={cn(isArabic && "scale-x-[-1]")}>
        {/* Title */}
        <h2 className="text-h3-semibold md:text-h2-semibold">{t("title")}</h2>
        {/* Title with blue line */}
        <div className="relative inline-block">
          <Image
            src="/images/home/blue-line.png"
            alt={t("alt.blue-line")}
            width={365}
            height={45}
            className="absolute top-1.5 left-100 z-10 hidden lg:inline-block"
          />
          <h3 className="text-h3-semibold md:text-h2-semibold relative z-20 mb-1">
            {t("subtitle")}
          </h3>
        </div>
        <p className="text-h5-regular w-full md:w-1/2">{t("description")}</p>

        {/* Badges */}
        <div className="flex gap-3.5 mt-6">
          {/* App store */}
          <Link href="https://apps.apple.com/us/app/hansy/id6755159172" target="_blank">
            <Image
              src="/images/badges/apple-store.svg"
              alt={t("alt.app-store")}
              width={176}
              height={64}
              className="w-36 h-16 md:w-44 md:h-16"
            />
          </Link>

          {/* Google play */}
          <Link href="https://play.google.com/store/apps/details?id=com.mediacreation.hansyrealestat" target="_blank">
            <Image
              src="/images/badges/google-play.svg"
              alt={t("alt.google-play")}
              width={176}
              height={64}
              className="w-36 h-16 md:w-44 md:h-16"
            />
          </Link>
        </div>
      </div>
    </section >
  )
}
