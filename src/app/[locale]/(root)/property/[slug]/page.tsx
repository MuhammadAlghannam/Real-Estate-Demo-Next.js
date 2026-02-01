import TruncateWords from "@/components/shared/TruncateWords";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Link } from "@/i18n/navigation";
import { singleProperty } from "@/lib/apis/properties/single-property.api";
import { formatCurrency, noLinkImage, prettifyLabel } from "@/lib/utils/helper";
import { CircleDollarSign, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import NearbyProperties from "../_components/NearbyProperties";
import PropertyCarousel from "../_components/property-carousel";
import PropertyContact from "../_components/property-contact";
import PropertyDetails from "../_components/property-details";
import PropertyFloor from "../_components/property-floor";
import PropertyVideo from "../_components/property-video";
import PropertyWishlist from "../_components/PropertyWishlist";
import ScheduleVisitModal from "../_components/ScheduleVisitModal";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // translations
  const t = await getTranslations("PropertySinglePage");
  const locale = await getLocale();
  const isArabic = locale === "ar";
  const formate = await getFormatter();

  // data
  const { slug } = await params;
  const {
    property,
    sliders,
    aminities,
    features,
    nearest_locations,
    additional_informations,
    property_plans,
  } = await singleProperty(slug);

  // validations
  if (!slug || !property || property.slug !== slug) return notFound()

  return (
    <div className="container-1440 pt-6 pb-20">
      {/* image slider */}
      <PropertyCarousel sliders={sliders} />

      {/* Title */}
      <div className="flex flex-col-reverse md:flex-row justify-between gap-6 items-start mt-6">
        <TruncateWords maxWords={30} className="sm:text-h3-semibold text-h5-semibold text-black ">{property.title}</TruncateWords>
        <div className="flex items-center justify-end gap-2 w-full md:w-1/4">
          {property.developer?.logo_path && (
            <Link href={`/developers/${property.developer?.id}`} className="w-13 h-13 leading-13 flex justify-center items-center p-2.5 shadow-md rounded-full">
              <Image
                src={noLinkImage(property.developer?.logo_path ?? '')}
                alt={t("alt.developer-logo")}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                quality={75}
              />
            </Link>
          )}
          {property.compound?.name && (
            <Link href={`/compounds/${property.compound.id}`} className="text-h7-regular cursor-pointer text-primary bg-secondary py-3 px-6 rounded-lg">{prettifyLabel(property.compound?.name)}</Link>
          )}
          <PropertyWishlist
            propertyId={property.id}
            isFavorited={property.is_favorited}
          />
        </div>
      </div>

      {/* address */}
      {property?.address && (
        <div className="flex items-center gap-2 mt-3 mb-6">
          <MapPin className="w-5 h-5 text-text-gray-dark" />
          <TruncateWords maxWords={13} className="md:text-h5-regular text-h6-regular text-text-gray-dark">{property.address}</TruncateWords>
        </div>
      )}

      {/* Price & contact & schedule */}
      <div className="flex md:flex-row flex-col md:items-center items-start justify-between pb-6 border-b border-border md:gap-0 gap-5">
        {/* price */}
        <div className="flex items-center gap-4">
          <h2 className="md:text-h3-semibold text-h4-semibold text-black">{formatCurrency(property.price, formate)}</h2>
          {property.downpayment && (
            <div className="flex items-center gap-2 text-h7-regular text-primary bg-secondary py-3 px-6 rounded-lg">
              <CircleDollarSign className="w-5 h-5 text-primary" />
              <span>{t("down-payment")} {formatCurrency(property.downpayment)}</span>
            </div>
          )}
        </div>

        {/* Contact &  schedule*/}
        <div className="flex items-center gap-6 ">
          {/* agent contact & whatsapp */}
          {property.customer_services && property.customer_services.length > 0 && (
            <PropertyContact
              property_customer_services={property.customer_services}
              property_slug={property.slug}
            />
          )}

          {/* Schedule a visit */}
          <ScheduleVisitModal slug={property.slug} />
        </div>
      </div>

      {/* Taps */}
      <Tabs defaultValue="property-details" className="w-full mt-2" dir={isArabic ? "rtl" : "ltr"}>
        <TabsList>
          <TabsTrigger value="property-details">{t("tabs.property-details")}</TabsTrigger>
          <TabsTrigger value="floor-plan">{t("tabs.floor-plan")}</TabsTrigger>
          <TabsTrigger value="property-video">{t("tabs.property-video")}</TabsTrigger>
        </TabsList>
        <TabsContent value="property-details" >
          <PropertyDetails
            property={property}
            additionalInformations={additional_informations}
            nearestLocations={nearest_locations}
            aminities={aminities}
            features={features}
          />
        </TabsContent>
        <TabsContent value="floor-plan">
          <PropertyFloor propertyPlans={property_plans} />
        </TabsContent>
        <TabsContent value="property-video">
          <PropertyVideo property={property} />
        </TabsContent>
      </Tabs>

      {/* Nearby Properties */}
      <h3 className="text-h4-semibold text-black mt-8 mb-3">{t("nearby-properties")}</h3>
      <NearbyProperties property={property} />
    </div>
  )
}

// Dynamic metadata per Next.js App Router
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'PropertySinglePage' });

  try {
    const { property } = await singleProperty(slug);
    const title = property?.seo_title || property?.title || t('metadata.fallback-title');
    const description = property?.seo_meta_description || property?.description?.slice(0, 160) || "";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://hansyrealestate.com/property/${slug}`,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: t('metadata.fallback-title'),
      description: "",
    };
  }
}
