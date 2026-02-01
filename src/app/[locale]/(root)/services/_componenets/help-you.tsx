import CustomeBtn from "@/components/shared/CustomeBtn";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function HelpYou() {
  // Translation
  const t = useTranslations("ServicesPage.help-you");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-10 md:py-20 flex flex-col gap-6 relative overflow-hidden">

      {/* Line  on the right */}
      <div className={cn(
        "absolute top-0 w-[150px] hidden md:block",
        "before:content-[''] before:absolute before:top-0 before:w-[900px] before:h-[6px] before:bg-black before:z-10",
        isArabic
          ? "left-20 before:right-[-400px]"
          : "right-20 before:left-[-400px]"
      )} />

      {/* Title */}
      <div className="text-center container-1440">
        <h2 className="text-h3-semibold md:text-h2-semibold text-black mb-1">{t("title")}</h2>
        {/* <p className="text-h6-regular text-text-black w-full md:w-3/4 mx-auto">
          Lorem ipsum dolor sit amet consectetur. Egestas at facilisi sed est ut nulla adipiscing egestas faucibus. At ipsum ultricies semper nisl ipsum sit suspendisse quisque habitant.
        </p> */}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-stretch container-1440">

        {/* Buy */}
        <div className="flex flex-col gap-2.5 p-8 rounded-lg bg-white items-center shadow-[0_10px_40px_0_rgba(24,26,32,0.08)]">

          {/* Image & title */}
          <div>
            <Image src="/images/services/buy.svg" alt={t("cards.buy.alt")} width={150} height={150} className="mx-auto" />
            <p className="text-h4-semibold">{t("cards.buy.title")}</p>
          </div>

          {/* desc */}
          <p className="text-h6-semibold text-muted-foreground text-center">{t("cards.buy.short-description")}</p>
          <p className="text-h6-reulgar text-muted-foreground text-center">{t("cards.buy.long-description")}</p>

          {/* Link with btn */}
          <CustomeBtn href="/properties" className="mt-5 text-black bg-transparent border border-black hover:bg-primary hover:border-primary">
            <span className="flex items-center gap-4">
              <p className="text-h7-regular">{t("cards.buy.button-text")}</p>
              <MoveUpRight />
            </span>
          </CustomeBtn>
        </div>


        {/* Sell */}
        <div className="flex flex-col gap-2.5 p-8 rounded-lg bg-white items-center shadow-[0_10px_40px_0_rgba(24,26,32,0.08)]">

          {/* Image & title */}
          <div>
            <Image src="/images/services/buy.svg" alt={t("cards.sell.alt")} width={150} height={150} className="mx-auto" />
            <p className="text-h4-semibold">{t("cards.sell.title")}</p>
          </div>

          {/* desc */}
          <p className="text-h6-semibold text-muted-foreground text-center">{t("cards.sell.short-description")}</p>
          <p className="text-h6-reulgar text-muted-foreground text-center">{t("cards.sell.long-description")}</p>

          {/* Link with btn */}
          {/* <CustomeBtn href="#" className="mt-5 text-black bg-transparent border border-black hover:bg-primary hover:border-primary">
            <span className="flex items-center gap-4">
              <p className="text-h7-regular">{t("cards.sell.button-text")}</p>
              <MoveUpRight />
            </span>
          </CustomeBtn> */}
        </div>

        {/* Rent */}
        {/* <div className="flex flex-col gap-2.5 p-8 rounded-lg bg-white items-center shadow-[0_10px_40px_0_rgba(24,26,32,0.08)]">

          Image & title
          <div>
            <Image src="/images/services/buy.svg" alt="Buy a property" width={150} height={150} />
            <p className="text-h4-semibold">Rent a property</p>
          </div>

          desc
          <p className="text-h6-semibold text-muted-foreground text-center">Find your dream home with ease.</p>
          <p className="text-h6-reulgar text-muted-foreground text-center">Explore a wide range of properties tailored to your needs, preferences, and budget. Whether you're looking for your first home or an investment opportunity.</p>

          Link with btn
          <CustomeBtn href="#" className="mt-5 text-black bg-transparent border border-black hover:bg-primary hover:border-primary">
            <span className="flex items-center gap-4">
              <p className="text-h7-regular">Rent a home</p>
              <MoveUpRight />
            </span>
          </CustomeBtn>
        </div> */}

      </div>

    </section>
  );
}
