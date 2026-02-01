import { singleCompound } from "@/lib/apis/compounds/single-compounds.api";
import { getContactUs } from "@/lib/apis/contact-us/contact.api";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import CompoundCarousel from "../_components/CompoundCarousel";
import CompoundDocuments from "../_components/CompoundDocuments";
import CompoundHeader from "../_components/CompoundHeader";
import CompoundPriceCard from "../_components/CompoundPriceCard";
import CompoundProperties from "../_components/CompoundProperties";
import PaymentPlansSlider from "../_components/PaymentPlansSlider";

type Props = {
  params: Promise<{ compoundId: string }>;
  searchParams: Promise<{ page?: string }>;
};

// Dynamic metadata per Next.js App Router
export async function generateMetadata(
  { params }: { params: Promise<{ compoundId: string }> }
): Promise<Metadata> {
  const { compoundId } = await params;
  const t = await getTranslations("CompoundSinglePage.metadata");

  try {
    const { data: compound } = await singleCompound(compoundId);
    const title = compound?.name || t("fallback-title");
    const description = compound?.aboutHtml ? compound.aboutHtml.replace(/<[^>]*>/g, '').slice(0, 160) : `Explore ${compound?.name} by ${compound?.developer?.name}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://hansyrealestate.com/compounds/${compoundId}`,
        type: "article",
        images: compound?.images?.[0]?.url ? [compound.images[0].url] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: t("fallback-title"),
      description: "",
    };
  }
}

export default async function Page({ params, searchParams }: Props) {
  const t = await getTranslations("CompoundSinglePage");

  // data
  const { compoundId } = await params;
  const { data: compound } = await singleCompound(compoundId);

  const contactUsData = await getContactUs();
  const contact = contactUsData?.contact;

  // validations
  if (!compoundId || !compound || compound.id !== parseInt(compoundId)) return notFound();

  return (
    <div className="container-1440 pt-6 pb-20">
      {/* Image slider */}
      <CompoundCarousel images={compound.images} />

      {/* Price Card */}
      <CompoundPriceCard
        resaleStartPrice={compound.resaleStartPrice}
        primaryStartPrice={compound.primaryStartPrice}
      />

      {/* Header: Title, Description & Developer */}
      <CompoundHeader
        name={compound.name}
        aboutHtml={compound.aboutHtml}
        developer={compound.developer}
      />

      {/* Payment Plans */}
      <PaymentPlansSlider paymentPlans={compound.paymentPlans} contactData={contact ? { phone: contact.phone, email: contact.email } : null} />

      {/* Details */}
      {(compound.googleMap?.mapUrl || compound.masterplanPdf || compound.masterplanImage) && (
        <div className="mt-8">
          <h3 className="sm:text-h5-semibold md:text-h4-semibold text-h6-semibold text-primary">{t("details")}</h3>
          <CompoundDocuments
            googleMap={compound.googleMap}
            masterplanPdf={compound.masterplanPdf}
            masterplanImage={compound.masterplanImage}
          />
        </div>
      )}

      {/* Properties */}
      <CompoundProperties compoundId={compoundId} searchParams={searchParams} />
    </div>
  );
}
