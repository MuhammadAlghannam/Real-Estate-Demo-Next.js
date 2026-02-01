"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";
import Image from "next/image";

interface Props {
  images: CompoundImage[];
}

export default function CompoundCarousel({ images }: Props) {

  // Translation
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Fallback image if no images are provided
  const displayImages = images.length > 0
    ? images
    : [{ id: 0, url: "/images/home/compound-1.png", caption: null }];

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
      className="-z-1"
    >
      <CarouselContent>
        {displayImages.map((item, i) => (
          <CarouselItem
            key={item.id || i}
            className="md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
          >
            <Image
              src={item.url}
              alt={item.caption || `Compound image ${i + 1}`}
              width={1000}
              height={300}
              className="w-full sm:h-[400px] h-[300px] object-cover rounded-lg"
              quality={75}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

