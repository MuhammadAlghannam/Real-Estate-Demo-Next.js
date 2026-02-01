import OppertunitiesCard from "@/components/features/oppertunities/OppertunitiesCard";
import Empty from "@/components/shared/Empty";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getRecommendedProperties } from "@/lib/apis/properties/recommended-properties.api";
import { getLocale, getTranslations } from "next-intl/server";

export default async function OfferingsOppertunitiesList() {

  // Translation
  const t = await getTranslations("HomePage.offerings-opportunities");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  // data
  const recommendedProperties = await getRecommendedProperties();

  const properties = recommendedProperties?.intro_content?.home1_intro?.slider_properties?.slice(0, 6) || [];

  if (properties.length === 0) return <Empty>{t("empty-state")}</Empty>;

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: false,
        align: "start",
        dragFree: true,
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      <CarouselContent className="-ml-4">
        {properties.map((property) => (
          <CarouselItem
            key={property.id}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3"
          >
            <div className="p-1">
              <OppertunitiesCard property={property} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
