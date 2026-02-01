import { useTranslations } from "next-intl";

export default function OurAchievements() {
  // Translation
  const t = useTranslations("AboutPage.our-achievements");

  return (
    <section className="py-10 md:py-20 flex flex-col gap-6 bg-[url('/images/about-us/our-achievements-bg.png')] bg-no-repeat bg-cover">
      {/* Title */}
      <div className="text-center container-1440">
        <h2 className="text-h3-semibold md:text-h2-semibold text-black mb-1">{t("title")}</h2>
        <p className="text-h6-regular text-black w-full md:w-3/4 mx-auto">
          <b>{t("description.part1")}</b> {t("description.part2")}
        </p>
        <p>{t("description.part3")}</p>
      </div>

      {/* Images Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 container-1440 w-fit gap-6">

        {/* Left Column (1st + 2nd) */}
        <div className="flex flex-col gap-6 w-60 items-center">
          {/* 1st Card */}
          <div className="relative flex aspect-square items-end justify-start rounded-xl overflow-hidden bg-[url('/images/about-us/achieve1.jpg')] bg-cover bg-center">
            <div className="w-full bg-black/60 p-3 text-left">
              <p className="text-white text-h5-semibold">{t("achievements.elsewhere-development.title")}</p>
              <p className="text-h6-regular text-white">
                {t("achievements.elsewhere-development.description")}
              </p>
            </div>
          </div>

          {/* 2nd Card */}
          <div className="relative flex aspect-square items-end justify-start rounded-xl overflow-hidden bg-[url('/images/about-us/achieve2.png')] bg-cover bg-center">
            <div className="w-full bg-black/60 p-3 text-left">
              <p className="text-white text-h5-semibold">{t("achievements.people-places.title")}</p>
              <p className="text-h6-regular text-white">
                {t("achievements.people-places.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Middle Column (Tall Card) */}
        <div className="flex justify-center w-60 items-center">
          <div className="relative flex  h-[550px] items-end justify-start rounded-xl overflow-hidden bg-[url('/images/about-us/achieve5.png')] bg-cover bg-center">
            <div className="w-full bg-black/60 p-3 text-left">
              <p className="text-white text-h5-semibold">{t("achievements.sed.title")}</p>
              <p className="text-h6-regular text-white">
                {t("achievements.sed.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (4th + 5th) */}
        <div className="flex flex-col gap-6 w-60 items-center">
          {/* 4th Card */}
          <div className="relative flex aspect-square items-end justify-start rounded-xl overflow-hidden bg-[url('/images/about-us/achieve4.png')] bg-cover bg-center">
            <div className="w-full bg-black/60 p-3 text-left">
              <p className="text-white text-h5-semibold">{t("achievements.ora.title")}</p>
              <p className="text-h6-regular text-white">
                {t("achievements.ora.description")}
              </p>
            </div>
          </div>

          {/* 5th Card */}
          <div className="relative flex aspect-square items-end justify-start rounded-xl overflow-hidden bg-[url('/images/about-us/achieve3.png')] bg-cover bg-center">
            <div className="w-full bg-black/60 p-3 text-left">
              <p className="text-white text-h5-semibold">{t("achievements.orascom.title")}</p>
              <p className="text-h6-regular text-white">
                {t("achievements.orascom.description")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      {/* <div className="flex justify-center">
        <CustomeBtn>Get Started Today</CustomeBtn>
      </div> */}
    </section>
  );
}
