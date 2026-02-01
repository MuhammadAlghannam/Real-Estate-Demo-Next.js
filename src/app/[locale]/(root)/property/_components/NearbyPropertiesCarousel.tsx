"use client";

import OppertunitiesCard from "@/components/features/oppertunities/OppertunitiesCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";

interface NearbyPropertiesCarouselProps {
  properties: Property[];
}

export default function NearbyPropertiesCarousel({ properties }: NearbyPropertiesCarouselProps) {

  // Translation
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className="w-full"
    >
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: "start",
          dragFree: false,
          direction: isArabic ? "rtl" : "ltr",
        }}
        plugins={[
          Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
        ]}
      >
        <CarouselContent className="-ml-4">
          {properties.map((nearbyProperty) => (
            <CarouselItem
              key={nearbyProperty.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3"
            >
              <div className="p-1">
                <OppertunitiesCard property={nearbyProperty} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
