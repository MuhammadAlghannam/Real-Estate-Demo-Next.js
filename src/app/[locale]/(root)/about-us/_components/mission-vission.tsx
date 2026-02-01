import { useTranslations } from "next-intl";

export default function MissionVision() {
  // Translation
  const t = useTranslations("AboutPage.mission-vision");

  return (
    <section className="py-10 md:py-20 flex flex-col gap-6 container-1440">

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

        {/* 1st card */}
        <div className="flex flex-col gap-3 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">🎯</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">{t("mission.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">{t("mission.description")}</p>
        </div>

        {/* 2nd card */}
        <div className="flex flex-col gap-3 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">🌟</p>
          </div>
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">{t("vision.title")}</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">{t("vision.description")}</p>
        </div>

        {/* 3rd card */}
        <div className="flex flex-col gap-3 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">🧠</p>
          </div>
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">{t("expertise.title")}</p>

          {/* List */}
          <ul className="list-disc text-muted-foreground text-h6-regular group-hover:text-white transition-colors px-4">
            <li>{t("expertise.items.experience")}</li>
            <li>{t("expertise.items.market-knowledge")}</li>
            <li>{t("expertise.items.segments")}</li>
          </ul>
        </div>

        {/* 4th card */}
        <div className="flex flex-col gap-3 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">💎</p>
          </div>
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">{t("core-values.title")}</p>

          {/* List */}
          <ul className="list-disc text-muted-foreground text-h6-regular group-hover:text-white transition-colors px-4">
            <li>{t("core-values.items.integrity")}</li>
            <li>{t("core-values.items.client-first")}</li>
            <li>{t("core-values.items.excellence")}</li>
            <li>{t("core-values.items.innovation")}</li>
            <li>{t("core-values.items.accountability")}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
