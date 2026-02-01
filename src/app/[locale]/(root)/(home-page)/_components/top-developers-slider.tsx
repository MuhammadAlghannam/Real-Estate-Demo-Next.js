"use client";

import Empty from "@/components/shared/Empty";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";
import AutoScroll from "embla-carousel-auto-scroll";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

type TopDevelopersSliderProps = {
  developers: DeveloperResponse;
};

export default function TopDevelopersSlider({ developers }: TopDevelopersSliderProps) {

  // Translation
  const t = useTranslations("HomePage.top-developers");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const autoScrollRef = useRef<ReturnType<typeof AutoScroll> | null>(null);

  //  Handle empty state
  if (!developers?.data || developers.data.length === 0) return <Empty>{t("empty-state")}</Empty>

  return (
    <div
      className="w-full"
      onMouseEnter={() => autoScrollRef.current?.stop()}
      onMouseLeave={() => autoScrollRef.current?.play()}
    >
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: "start",
          dragFree: true,
          direction: isArabic ? "rtl" : "ltr",
        }}
        plugins={[
          (autoScrollRef.current = AutoScroll({
            speed: 2,
            stopOnInteraction: true,
            stopOnMouseEnter: false,
            direction: isArabic ? "backward" : "forward"
          })),
        ]}
      >
        <CarouselContent className="-ml-1">
          {developers?.data?.map((developer) => (
            <CarouselItem
              key={developer.id}
              className="pl-1 basis-[40%] sm:basis-[25%] md:basis-[20%] lg:basis-[15%] xl:basis-[12.5%]"
            >
              <Link href={`/developers/${developer.id}`} className="p-1 d-block">
                <div className="h-32 flex items-center justify-center rounded-md overflow-hidden relative">
                  <Image
                    src={developer?.logo_url || "/images/home/hero-red-circle.svg"}
                    alt={developer.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw"
                    priority={false}
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div >
  );
}
