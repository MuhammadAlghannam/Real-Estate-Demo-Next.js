import BottomAuth from "@/components/features/auth/BottomAuth";
import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import RegisterLayout from "./_components/register-layout";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RegisterPage' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description')
  };
}

export default async function Page() {
  const t = await getTranslations("RegisterPage");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  return (
    <div className="relative h-screen">
      <div className={cn("fixed inset-0 z-[-1]", isArabic ? "right-0" : "left-0")}>
        <Image
          src={"/images/auth/auth-bg-gray.png"}
          alt={t("alt.gray-bg")}
          width={1440}
          height={1024}
          className={cn("w-full h-full object-cover bg-no-repeat opacity-40", isArabic && "scale-x-[-1]")}
          priority
          quality={75}
        />
      </div>

      <div className="container-1440 py-16.5 z-10 h-screen overflow-y-auto">
        <div className="w-full lg:w-2/3 xl:w-1/2">
          {/* Logo */}
          <Image
            src={"/images/logos/logo-auth.svg"}
            alt={t("alt.logo")}
            width={88}
            height={52}
            className="w-[88px] h-[52px]"
            priority
            quality={75}
          />

          <h2 className="sm:text-h1-semibold text-h3-semibold text-black mt-6">{t("welcome")}</h2>
          <p className="sm:text-h5-regular text-h6-regular text-text-gray-dark mt-1.5">{t("subtitle")}</p>

          {/* forms layout */}
          <RegisterLayout />

          {/* Bottom Head Form */}
          <BottomAuth variant="register" />
        </div>
      </div>

      <Image
        src={"/images/auth/auth-building-left.png"}
        alt={t("alt.building")}
        width={1200}
        height={1200}
        className={cn("fixed top-0 w-[900px] h-[1200px] object-cover z-0 pointer-events-none select-none lg:block hidden", isArabic ? "left-0 scale-x-[-1]" : "right-0")}
        priority
        quality={75}
      />
    </div>
  )
}
