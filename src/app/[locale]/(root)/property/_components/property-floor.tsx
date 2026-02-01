import TruncateWords from "@/components/shared/TruncateWords";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { noLinkImage } from "@/lib/utils/helper";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface Props {
  propertyPlans: PropertyPlan[];
}

export default async function PropertyFloor({ propertyPlans }: Props) {
  const t = await getTranslations("PropertySinglePage.property-floor");
  
  if (!propertyPlans?.length) {
    return (
      <div className="mt-6 text-center text-text-gray-dark">
        {t("empty-state")}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Accordion type="single" collapsible className="w-full">
        {propertyPlans.map((plan) => (
          <AccordionItem key={plan.id} value={`plan-${plan.id}`}>
            <AccordionTrigger className="text-h4-semibold text-black hover:text-primary">
              {plan.title}
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              {/* Floor Plan Image */}
              {plan.image && (
                <div className="w-full h-96 relative rounded-lg overflow-hidden">
                  <Image
                    src={noLinkImage(plan.image)}
                    alt={plan.title}
                    quality={75}
                    fill
                    className="object-contain bg-muted"
                  />
                </div>
              )}

              {/* Description */}
              {plan.description && (
                <div>
                  <TruncateWords
                    maxWords={30}
                    showReadMore={true}
                    className="text-h6-regular text-text-gray-dark"
                  >
                    {plan.description}
                  </TruncateWords>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
