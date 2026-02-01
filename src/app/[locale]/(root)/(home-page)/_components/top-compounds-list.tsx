import Empty from "@/components/shared/Empty";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";
import { getTopCompounds } from "@/lib/apis/compounds/top-compounds.api";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";


export default async function CompoundsList() {

  // Translation
  const t = await getTranslations("HomePage.top-compounds");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  // Fetch compounds
  const compounds = await getTopCompounds();

  // Handle empty data
  if (!compounds?.data || compounds?.data?.length === 0) return <Empty>{t("empty-state")}</Empty>;

  return (
    <Carousel
      className="w-full mt-6"
      opts={{
        loop: false,
        align: "start",
        dragFree: true,
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      <CarouselContent className="-ml-4 mb-2">
        {compounds?.data?.map((compound) => {
          return (
            <CarouselItem
              key={compound.id}
              className="md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-0">
                <Link
                  href={`/compounds/${compound.id}`}
                  className="flex flex-col rounded-lg border-rounded-lg shadow-sm"
                >
                  {/* Image */}
                  <div className="relative w-full h-[180px]">
                    <Image
                      src={
                        compound?.images?.[0]?.url ||
                        "/images/home/compound-1.png"
                      }
                      alt={compound.name}
                      fill
                      className="object-cover rounded-t-lg"
                      priority
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 16vw"
                    />
                  </div>

                  {/* Title */}
                  <div className="text-center py-5 px-1 flex flex-col gap-1.5">
                    <p className="text-h5-semibold md:text-h6-semibold text-black">
                      {compound.name}
                    </p>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
