import Empty from "@/components/shared/Empty";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getGlobalFAQs } from "@/lib/apis/global/global-faqs.api";
import { getTranslations } from "next-intl/server";



export default async function FAQs() {
  // Translation
  const t = await getTranslations("OurAgentsPage.faqs");

  // Fetch FAQs
  const data = await getGlobalFAQs();
  const faqs = data?.faq?.faqs ?? [];

  return (
    <section className="container-1440 py-10 md:py-20 text-center mx-auto">

      {/* Titles */}
      <h2 className="sm:text-h2-semibold text-[28px] font-semibold text-black">
        {t("title")}
      </h2>
      <p className="text-h6-regular w-full lg:w-7/11 mx-auto mb-6">
        {t("description")}
      </p>

      {/* Accordion */}
      {/* If no FAQs */}
      {faqs.length === 0 ? (
        <Empty>{t("empty-state")}</Empty>
      ) : (
        <Accordion
          type="single"
          collapsible
          className="grid grid-cols-1 md:grid-cols-2 gap-x-15 lg:gap-x-44 gap-y-6"
        >
          {faqs?.map((item, index) => (
            <AccordionItem
              key={item.id}
              value={`faq-${item.id}`}
              className={`flex flex-col py-6 text-left border-b border-border`}
            >
              {/* Header */}
              <AccordionTrigger className="p-0 hover:no-underline flex items-center justify-between w-full">
                {/* Left section */}
                <div className="flex flex-col items-start">
                  <p className="mb-3 text-primary text-h4-semibold">
                    {(index + 1) < 10
                      ? `0${index + 1}.`
                      : `${index + 1}.`
                    }
                  </p>
                  <p className="mb-1.5 text-h4-semibold">
                    {item?.question}
                  </p>
                </div>
              </AccordionTrigger>

              {/* Body (answer) */}
              <AccordionContent className="text-h6-regular pt-1 text-left">
                {item?.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}


    </section>
  )
}
