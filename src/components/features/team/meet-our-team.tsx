import { useTranslations } from "next-intl";
import Image from "next/image";
import { team } from "./team";

export default function MeetOurTeam() {
  // Translation
  const t = useTranslations("AboutPage.meet-our-team");

  return (
    <section className="py-10 md:py-20 bg-black">
      <div className="container-1440 flex gap-6 justify-center items-start flex-col">

        {/* Titles */}
        <div className="flex flex-col  items-center w-full justify-center text-center">
          <h2 className="text-h2-semibold text-white">{t("title")}</h2>
          <p className="text-h6-regular text-white w-full md:w-8/10 mx-auto text-center">
            {t("description")}
          </p>
        </div>

        {/* Team*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {team.map((member) => (
            /* card */
            <div
              key={member.id}
              className="pb-6 rounded-3xl border-2 border-border overflow-hidden flex flex-col justify-between"
            >
              {/* Image */}
              <div className="mb-4">
                <Image
                  src={member.image}
                  alt={member.alt}
                  width={282}
                  height={282}
                  className="w-full h-auto object-cover rounded-t-3xl"
                />
              </div>

              {/* Title */}
              <div className="px-4 text-start">
                <p className="text-white text-h6-semibold">{member.name}</p>
                <p className="text-muted-foreground">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
