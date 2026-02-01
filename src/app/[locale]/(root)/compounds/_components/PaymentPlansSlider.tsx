"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLocale, useTranslations } from "next-intl";
import ContactModal from "./ContactModal";

interface Props {
  paymentPlans: PaymentPlan[];
  contactData: { phone: string; email: string } | null;
}

export default function PaymentPlansSlider({ paymentPlans, contactData }: Props) {

  // Translation
  const t = useTranslations("CompoundSinglePage.payment-plans");
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Don't render if no payment plans
  if (!paymentPlans || paymentPlans.length === 0) return null;

  return (
    <div className="mt-8">
      <Carousel
        opts={{
          loop: paymentPlans.length > 1,
          align: "start",
          dragFree: false,
          direction: isArabic ? "rtl" : "ltr",
        }}
        plugins={
          paymentPlans.length > 1
            ? [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
            : []
        }
      >
        <CarouselContent>
          {paymentPlans.map((plan) => (
            <CarouselItem
              key={plan.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3"
            >
              <div className="bg-white rounded-lg border border-border p-5 h-full flex flex-col">
                {/* Plan Title */}
                <h3 className="text-h5-semibold md:text-h4-semibold text-black mb-1">
                  {plan.title}
                </h3>

                {/* Plan Description */}
                {plan.description ? (
                  <p className="text-h7-regular md:text-h6-regular text-text-gray-dark mb-6 flex-grow">
                    {plan.description}
                  </p>
                ) : (
                  <p className="text-h7-regular md:text-h6-regular text-text-gray-dark mb-6 flex-grow">
                    {t("no-description")}
                  </p>
                )}

                {/* Get Plan Button */}
                {contactData && (
                  <ContactModal contactData={{ phone: contactData.phone, email: contactData.email }}>
                    <CustomeBtn className="w-full mt-auto">
                      {t("get-plan")}
                    </CustomeBtn>
                  </ContactModal>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div >
  );
}

