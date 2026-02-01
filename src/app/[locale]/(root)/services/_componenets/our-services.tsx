import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function OurServices() {
  // Translation
  const t = useTranslations("ServicesPage.our-services");
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


{/* <div className="flex flex-col lg:flex-row gap-4 items-start justify-center ">

Left
<div className="flex-1 py-10 md:py-20">

  Titles
  <h2 className="sm:text-h2-semibold text-[28px] font-semibold text-black w-8/10 mb-1">Our Services</h2>
  <p className="text-h5-regular w-8/10 mb-6">At Hansy Real Estate, we elevate the home-buying experience with a range of personalized services designed to meet your needs.</p>

  Icons
  <div className="flex flex-col gap-6">
    1st icon & title
    <div className="flex items-center gap-5.5">
      Icon
      <p className="text-4xl">🏠</p>
      Title
      <div className="div">
        <p className="text-h5-semibold">Residential Property Sales</p>
        <p className="text-h6-regular">Helping families and individuals find their perfect home.</p>
      </div>
    </div>

    2nd icon
    <div className="flex items-center gap-5.5">
      Icon
      <p className="text-4xl">🏢</p>
      Title
      <div className="div">
        <p className="text-h5-semibold">Commercial Property Brokerage</p>
        <p className="text-h6-regular">Offices, Shops, and Investments Spaces tailored to your business.</p>
      </div>
    </div>

    3rd icon
    <div className="flex items-center gap-5.5">
      Icon
      <p className="text-4xl">📈</p>
      Title
      <div className="div">
        <p className="text-h5-semibold">Real Estate Investment Advisory</p>
        <p className="text-h6-regular">High-return opportunities backed by thorough market analysis.</p>
      </div>
    </div>

    4th icon
    <div className="flex items-center gap-5.5">
      Icon
      <p className="text-4xl">⚖️</p>
      Title
      <div className="div">
        <p className="text-h5-semibold">Legal & Contractual Assistance </p>
        <p className="text-h6-regular">Full legal support through buying or selling processes </p>
      </div>
    </div>

    5th icon
    <div className="flex items-center gap-5.5">
      Icon
      <p className="text-4xl">🛠️</p>
      Title
      <div className="div">
        <p className="text-h5-semibold">Property Management Services</p>
        <p className="text-h6-regular">From rent collection to maintenance, we&apos;re got you covered.</p>
      </div>
    </div>
  </div>
</div>

Right
<div className="flex-1">
  <Image
    src="/images/about-us/our-services.png"
    alt="background"
    width={979}
    height={994}
  />

  <p className="text-h5-regular py-10 w-8/10">Whether you&apos;re a first -time buyer or an investor,
    We&apos;re here to help you find your dream property.
    Experience the difference with <b>Hansy</b> Real Estate!</p>
</div>

</div> */}
