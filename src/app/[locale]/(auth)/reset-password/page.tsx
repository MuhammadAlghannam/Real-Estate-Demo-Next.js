import BottomAuth from "@/components/features/auth/BottomAuth";
import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import ResetPasswordForm from "./_components/reset-password-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ResetPasswordPage' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description')
  };
}

export default async function Page() {
  const t = await getTranslations("ResetPasswordPage");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  return (
    <div className="relative h-screen">
      <div className={cn("fixed inset-0 z-[-1]", isArabic ? "right-0" : "left-0")}>
        <Image
          src={"/images/auth/auth-bg-gray.png"}
          alt={t("alt.gray-bg")}
          width={574}
          height={1024}
          className={cn("w-[574px] h-[1024px] opacity-40", isArabic ? "scale-x-[-1]" : "")}
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

          <h2 className="sm:text-h1-semibold text-h3-semibold text-black mt-6">{t("title")}</h2>
          <p className="sm:text-h5-regular text-h6-regular text-text-gray-dark mt-1.5">{t("subtitle")}</p>

          <h3 className="text-h5-semibold text-black mt-4">{t("heading")}</h3>

          {/* Forget password form */}
          <ResetPasswordForm />

          {/* Bottom Head Form */}
          <BottomAuth variant="forget-password" />
        </div>
      </div>

      <Image
        src={"/images/auth/auth-building-left.png"}
        alt={t("alt.building")}
        width={1200}
        height={1200}
        className={cn("fixed top-0 w-[900px] h-[1200px] object-cover z-0 pointer-events-none select-none lg:block hidden", isArabic ? "right-0 scale-x-[-1]" : "left-0")}
        priority
        quality={75}
      />
    </div>
  )
}