import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Empty } from "@/components/ui/empty";
import { getHansyCircleFAQs } from "@/lib/apis/global/hansy-circle-faqs.api";
import { getTranslations } from "next-intl/server";

export default async function FAQs() {
  // Translation
  const t = await getTranslations("HansyCirclePage.faqs");

  // Fetch FAQs
  const data = await getHansyCircleFAQs();
  const faqs = data?.data ?? [];

  return (
    <section className="py-10 md:py-20 flex flex-col container-1440 gap-6">

      {/* Title */}
      <div>
        <h2 className="text-h3-semibold md:text-h2-semibold text-black mb-1 text-center md:text-start">{t("title")}</h2>
        <p className="text-h6-regular text-text-black text-center md:text-start">
          {t("description.part1")} </p>
        <p className="text-h6-regular text-text-black text-center md:text-start">
          {t("description.part2")}</p>
      </div>

      {/* Accordion */}
      {faqs.length === 0 ? (
        <Empty>{t("empty-state")}</Empty>
      ) : (
        <Accordion
          type="single"
          collapsible
          className="grid grid-cols-1 md:grid-cols-2 gap-x-15 lg:gap-x-44 gap-y-6"
        >
          {faqs.map((item, index) => (
            <AccordionItem
              key={item.id}
              value={`faq-${item.id}`}
              className="flex flex-col py-6 text-left border-b border-border"
            >
              {/* Header */}
              <AccordionTrigger className="p-0 hover:no-underline flex items-center justify-between w-full">
                {/* Left section */}
                <div className="flex flex-col items-start">
                  {/* <p className="mb-3 text-primary text-h4-semibold">
                    {(index + 1) < 10
                      ? `0${index + 1}.`
                      : `${index + 1}.`
                    }
                  </p> */}
                  <p className="mb-1.5 text-h4-semibold">
                    {item.title}
                  </p>
                </div>
              </AccordionTrigger>

              {/* Body */}
              <AccordionContent className="text-h6-regular pt-1 text-left whitespace-pre-line">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* See All FAQ`s */}
      {/* <div className="flex justify-end mt-6">
        <Link
          href="#"
          className="inline-flex items-center gap-3 group transition-colors"
        >
          <p className="text-h6-semibold transition-colors duration-300 group-hover:text-primary">
            See All FAQ&apos;s
          </p>
          <ArrowDownLeft className="text-black transition-all duration-300 group-hover:text-primary group-hover:-rotate-180" />
        </Link>
      </div> */}


      {/* Cards */}
      {/*
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

    <div className="flex flex-col gap-8 p-12 rounded-lg border border-border items-center">

      <div>
        <h3 className="text-h4-semibold text-black">
          How can I contact with Hansy agent ?
        </h3>
      </div>

      <p className="text-h6-regular text-muted-foreground">
        Discover the different ways you can get in touch with our experienced agent .
      </p>

      <div className="flex w-full">
        <Link
          href="#"
          className="inline-flex gap-3 group transition-colors"
        >
          <p className="text-h6-semibold transition-colors duration-300 group-hover:text-primary">
            Read More
          </p>
          <ArrowDownLeft className="text-black transition-all duration-300 group-hover:text-primary group-hover:-rotate-180" />
        </Link>
      </div>

    </div>

  </div>
*/}
    </section>
  )
}
