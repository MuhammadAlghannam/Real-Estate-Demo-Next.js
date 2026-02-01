import { auth } from "@/auth";
import CustomeBtn from "@/components/shared/CustomeBtn";
import { getAllProperties } from "@/lib/apis/properties/properties.api";
import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import FastFilterForm from "./FastFilterForm";

export default async function Hero() {
  // translations
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  // data
  const session = await auth();
  const sellPropertiesResponse = await getAllProperties({ userId: session?.user?.id });
  const propertyTypes = sellPropertiesResponse?.property_types || [];

  return (
    <section className={cn(
      "bg-[url('/images/home/hero-bg.png')] bg-no-repeat bg-cover py-12 overflow-x-hidden",
      isArabic && "scale-x-[-1]"
    )}>
      <div className={cn(
        "flex md:flex-row flex-col justify-between w-full md:gap-12.5 gap-3 container-1440 relative",
        isArabic && "scale-x-[-1]"
      )}>
        {/* left */}
        <div className="flex-2">
          <div className="md:pr-18 pr-0">
            <h2 className="sm:text-h1-semibold text-[28px] font-semibold text-black">{t("hero.title")}</h2>
            <h2><span className="sm:text-h1-regular text-h3-regular text-black">{t("hero.subtitle.prefix")}</span> <span className="sm:text-h1-semibold text-h3-semibold italic text-primary">{t("hero.subtitle.brand")}</span></h2>
            <p className="sm:text-h5-regular text-h6-regular text-black mt-2.5">{t("hero.description")}</p>

            <div className="flex justify-between items-center">
              <CustomeBtn href="/hansy-circle" className="bg-white! border border-primary text-primary!">{t("hero.view-more")}</CustomeBtn>

              <div className="flex items-center justify-center">
                <Image
                  src="/images/home/hero-red-circle.svg"
                  alt={t("hero.alt.circle")}
                  width={120}
                  height={120}
                  className="w-[90px] h-[90px] animate-[spin_12s_linear_infinite] origin-center mb-4"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="ml-0 md:block md:ms-[-100] hidden">
              <Image
                src={"/images/home/hero-buy-2.png"}
                alt={t("hero.alt.buy")}
                width={1000}
                height={328}
                priority
                quality={75}
              />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 w-full md:flex md:justify-end">
          <div className="md:block hidden">
            <Image
              src={"/images/home/hero-sell-2.png"}
              alt={t("hero.alt.sell")}
              width={406}
              height={443}
              priority
              quality={75}
            />
          </div>

          {/* <div className="flex flex-col items-center justify-center mr-[-100]">
            <Image
              src={"/images/home/hero-rent.png"}
              alt={"HIS Rent"}
              width={438}
              height={446}
              className="w-[438px] h-[446px]"
              priority
              quality={75}
            />
          </div> */}
        </div>

        {/* filters */}
        <div className={cn(
          "py-8 px-7 bg-white rounded-lg md:absolute block bottom-[40px] md:w-3/4 w-full shadow-xl",
          isArabic ? "right-0" : "left-0"
        )}>
          <FastFilterForm propertyTypes={propertyTypes} />
        </div>
      </div>

    </section>
  )
}
