import { useTranslations } from "next-intl";

export default function OurLocation() {
  // Translation
  const t = useTranslations("OurAgentsPage.our-location");

  return (
    <section className="container-1440 py-10 md:py-20 text-center mx-auto">
      {/* Titles */}
      <h2 className="sm:text-h2-semibold text-[28px] font-semibold text-black">
        {t("title")}
      </h2>
      <p className="text-h6-regular w-full lg:w-7/11 mx-auto mb-6">
        {t("description")}
      </p>

      {/* map */}
      <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4047.6653444337953!2d29.935286176089406!3d31.21236566229388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDEyJzQ0LjUiTiAyOcKwNTYnMTYuMyJF!5e1!3m2!1sen!2seg!4v1763906409940!5m2!1sen!2seg" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </section>
  )
}
