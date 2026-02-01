import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WhereWeOperate() {
  // Translation
  const t = useTranslations("AboutPage.where-we-operate");

  return (
    <section className="py-10 md:pt-20 pb-10 md:pb-15 flex flex-col gap-3.5 container-1440">

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-h3-semibold md:text-h2-semibold text-black mb-1">{t("title")}</h2>
        <p className="text-h6-regular text-black w-full mx-auto">
          <b>{t("description.part1")}</b> {t("description.part2")}
        </p>
        <p className="text-h6-regular text-black w-full mx-auto">
          {t("description.part3")}
        </p>
      </div>

      {/* This section is hidden switch hidden to flex */}
      {/* Locations */}
      <div className="hidden flex-col md:flex-row justify-center items-center gap-8 md:gap-0">

        {/* 1st col */}
        <div className="flex flex-col gap-18.5 flex-1 items-center md:items-start text-center md:text-left">
          {/* Smouha*/}
          <div className="flex flex-col items-center md:items-start">
            <Image src="/images/about-us/location-icon.svg" alt={t("alt.location")} width={49} height={71} />
            <p className="text-h5-semibold">{t("locations.delta-life-tower-albert.title")}</p>
            <p className="text-h6-regular">{t("locations.delta-life-tower-albert.subtitle")}</p>
          </div>

          {/* Matrouh Road */}
          <div className="flex flex-col items-center md:items-start">
            <Image src="/images/about-us/location-icon.svg" alt={t("alt.location")} width={49} height={71} />
            <p className="text-h5-semibold">{t("locations.north-gate-mall.title")}</p>
            <p className="text-h6-regular">{t("locations.north-gate-mall.subtitle")}</p>
          </div>
        </div>

        {/* 2nd col image */}
        <div className="flex-2 flex justify-center items-center my-6 md:my-0">
          <Image
            className="w-full h-auto md:w-auto"
            src="/images/about-us/mob-location.png"
            alt={t("alt.mob-location")}
            width={1240}
            height={397}
          />
        </div>

        {/* 3rd col */}
        <div className="flex flex-col gap-18.5 flex-1 items-center md:items-end text-center md:text-right">
          {/* Smouha*/}
          <div className="flex flex-col items-center md:items-end">
            <Image src="/images/about-us/location-icon.svg" alt={t("alt.location")} width={49} height={71} />
            <p className="text-h5-semibold">{t("locations.kamal-el-din-salah.title")}</p>
            <p className="text-h6-regular">{t("locations.kamal-el-din-salah.subtitle")}</p>
          </div>

          {/* Delta life Tower */}
          <div className="flex flex-col items-center md:items-end">
            <Image className="sl" src="/images/about-us/location-icon.svg" alt={t("alt.location")} width={49} height={71} />
            <p className="text-h5-semibold">{t("locations.delta-life-tower-smouha.title")}</p>
            <p className="text-h6-regular">{t("locations.delta-life-tower-smouha.subtitle")}</p>
          </div>
        </div>

      </div>

      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-20 md:gap-8">
        {/* 2nd col image */}
        <div className="flex justify-center items-center ms-0 md:-ms-45">
          <Image
            className="w-[900px] h-[300px] md:w-auto"
            src="/images/about-us/mob-location.png"
            alt={t("alt.mob-location")}
            width={900}
            height={300}
          />
        </div>

        {/* 3rd col */}
        {/* Smouha*/}
        <div className="flex flex-col items-center md:items-end">
          <Image src="/images/about-us/location-icon.svg" alt={t("alt.location")} width={49} height={71} />
          <p className="text-h5-semibold">{t("locations.kamal-el-din-salah.title")}</p>
          <p className="text-h6-regular">{t("locations.kamal-el-din-salah.subtitle")}</p>
        </div>


      </div>

    </section>
  )
}
