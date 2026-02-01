import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WhatHansyCircle() {
  // Translation
  const t = useTranslations("HansyCirclePage.what-hansy-circle");

  return (
    <section className="container-1440 text-center mt-10 mx-auto">
      <h2 className="sm:text-h2-semibold text-[28px] font-semibold text-black">
        {t("title")}
      </h2>
      <p className="sm:text-h5-regular text-h6-regular w-full lg:w-9/10 mx-auto">
        {t("description")}
      </p>
      <Image
        src="/images/hancy-circle/2nd-section-bg.png"
        alt={t("alt.circle")}
        width={1240}
        height={299}
        className="mx-auto"
      />
    </section>
  )
}
