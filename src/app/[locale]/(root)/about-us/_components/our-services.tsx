import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function OurServices() {

  // Translation
  const t = useTranslations("AboutPage.our-services");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-10 md:py-20 relative bg-cover no-repeat bg-center bg-no-repeat " style={{ backgroundImage: "url('/images/services/ser-top-bg-pattern.png')" }}>
      <Image
        src="/images/services/ser-top-r.svg"
        alt={t("alt")}
        width={90}
        height={100}
        className={cn(
          "absolute hidden md:block top-0",
          isArabic ? "left-0 scale-x-[-1]" : "right-0"
        )}
      />

      <div className="container-1440">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-h3-semibold md:text-h2-semibold text-black mb-1">{t("title")}</h2>
          {/* <p className="text-h6-regular text-black w-full mx-auto">
        At <b>Hansy</b> Real Estate, we elevate the home-buying experience with a range of personalized services designed to meet your needs.
      </p> */}
          {/* <p className="text-h6-regular text-black w-full mx-auto">
        our clients with convenient and accessible services.
      </p> */}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mt-8">
          {/* left */}
          <div className="flex-1">
            <p className="sm:text-h5-regular text-h6-regular ">{t("description.part1")}</p>
            <p className="sm:text-h5-regular text-h6-regular mt-2">{t("description.part2")}</p>
          </div>
          {/* right */}
          <div className="flex-1">
            <Image
              src="/images/services/ser-head.png"
              alt={t("alt")}
              width={592}
              height={291}
              className="h-[291px] object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
