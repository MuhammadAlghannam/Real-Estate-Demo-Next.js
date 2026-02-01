import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Requirements() {
  // Translation
  const t = useTranslations("HansyCirclePage.requirements");

  return (
    <section className="container-1440 py-10 md:py-20">
      <h2 className="sm:text-h2-semibold text-[28px] font-semibold text-black text-center">
        {t("title")}
      </h2>
      <p className="text-h5-regular w-full lg:w-7/11 mx-auto text-center">
        {t("description")}
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5.5 p-6 items-stretch">

        {/* 1st card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start">
          {/* Icon */}
          <Image src="/images/hancy-circle/skills.svg" alt={t("cards.communication-skills.alt")} width={48} height={48} />

          {/* Title */}
          <p className="text-h5-semibold text-black">{t("cards.communication-skills.title")}</p>
          <p className="text-muted-foreground text-h6-regular">{t("cards.communication-skills.description")}</p>
        </div>

        {/* 2nd card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start">
          {/* Icon */}
          <Image src="/images/hancy-circle/self-motivated.svg" alt={t("cards.self-motivated.alt")} width={48} height={48} />


          {/* Title */}
          <p className="text-h5-semibold text-black">{t("cards.self-motivated.title")}</p>
          <p className="text-muted-foreground text-h6-regular">{t("cards.self-motivated.description")}</p>
        </div>

        {/* 3rd card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start">
          {/* Icon */}
          <Image src="/images/hancy-circle/social-media.svg" alt={t("cards.passion-real-estate.alt")} width={48} height={48} />

          {/* Title */}
          <p className="text-h5-semibold text-black">{t("cards.passion-real-estate.title")}</p>
          <p className="text-muted-foreground text-h6-regular">{t("cards.passion-real-estate.description")}</p>
        </div>

        {/* 4th card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start">
          {/* Icon */}
          <Image src="/images/hancy-circle/key.svg" alt={t("cards.availability-commitment.alt")} width={48} height={48} />

          {/* Title */}
          <p className="text-h5-semibold text-black">{t("cards.availability-commitment.title")}</p>
          <p className="text-muted-foreground text-h6-regular">{t("cards.availability-commitment.description")}</p>
        </div>
      </div>
    </section>
  )
}
