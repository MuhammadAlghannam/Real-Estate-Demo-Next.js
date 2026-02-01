import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Suspense } from "react";
import ContactUsBoxes from "./_components/ContactUsBoxes";
import ContactUsForm from "./_components/ContactUsForm";

// Metadata
export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "ContactUsPage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Page() {
  const t = await getTranslations("ContactUsPage");

  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      {/* Head */}
      <div className="mb-12">
        <h1 className="md:text-h1-semibold text-h2-semibold text-black text-center">{t("title")}</h1>
        <p className="text-h6-regular text-black text-center mt-1">{t("description")}</p>
      </div>

      <div className="flex md:flex-row flex-col items-center justify-between gap-6 w-full">
        {/* Form */}
        <div className="md:w-[60%] w-full">
          <ContactUsForm />
        </div>

        {/* Image */}
        <div className="w-[40%] md:block hidden">
          <Image
            src="/images/contact-us/man-phone.png"
            alt={t("alt.background")}
            width={400}
            height={600}
            className="w-full h-full object-cover"
            quality={75}
          />
        </div>
      </div>

      {/* Boxes */}
      <Suspense fallback={<LoadingSpinner />}>
        <ContactUsBoxes />
      </Suspense>
    </section>
  )
}
