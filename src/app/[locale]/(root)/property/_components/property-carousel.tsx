"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { noLinkImage } from "@/lib/utils/helper";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";
import Image from "next/image";

interface Props {
  sliders: PropertySlider[];
}

export default function PropertyCarousel({ sliders }: Props) {

  // Translation
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <Carousel
      opts={{
        loop: true,
        align: "start",
        dragFree: false,
        direction: isArabic ? "rtl" : "ltr",
      }}
      plugins={[
        Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true }),
      ]}
    >
      <CarouselContent>
        {sliders.map((item, i) => (
          <CarouselItem
            key={i}
            className="md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
          >
            <Image
              src={noLinkImage(item.image)}
              alt="background"
              width={1000}
              height={300}
              className="w-full sm:h-[400px] h-[300px] object-cover rounded-lg"
              quality={75}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
