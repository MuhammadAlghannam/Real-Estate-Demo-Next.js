import OppertunitiesCard from "@/components/features/oppertunities/OppertunitiesCard";
import Empty from "@/components/shared/Empty";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getCompoundsProperties } from "@/lib/apis/compounds/compound-properties.api";
import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import CompoundPropertiesPagination from "./CompoundPropertiesPagination";

type Props = {
  compoundId: string;
  searchParams: Promise<{ page?: string }>;
};

export default async function CompoundProperties({ compoundId, searchParams }: Props) {
  // translations
  const t = await getTranslations("CompoundSinglePage.properties");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  // Search Params
  const params = await searchParams;
  const page = Number(params.page) || 1;

  // Fetch properties for all tabs
  const allPropertiesResponse = await getCompoundsProperties({ compoundId, page });
  const primaryPropertiesResponse = await getCompoundsProperties({ compoundId, page, saleType: "primary" });
  const resalePropertiesResponse = await getCompoundsProperties({ compoundId, page, saleType: "resale" });

  // Extract data
  const allProperties = allPropertiesResponse?.data ?? [];
  const primaryProperties = primaryPropertiesResponse?.data ?? [];
  const resaleProperties = resalePropertiesResponse?.data ?? [];

  // Meta data
  const allMeta = allPropertiesResponse?.meta;
  const primaryMeta = primaryPropertiesResponse?.meta;
  const resaleMeta = resalePropertiesResponse?.meta;

  // Helper function to render properties grid with pagination
  const renderPropertiesTab = (properties: CompoundProperty[], meta: PaginationMeta | undefined) => {
    const hasItems = Array.isArray(properties) && properties.length > 0;
    const totalPages = meta?.last_page ?? 1;
    const currentPage = meta?.current_page ?? 1;
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    const showPagination = hasItems && totalPages > 1;

    if (!hasItems) return <Empty>{t("empty-state")}</Empty>;

    // Convert CompoundProperty to Property format for OppertunitiesCard
    const convertedProperties = properties.map((prop) => ({
      id: prop.id,
      is_favorited: false,
      agent_id: prop.agent?.id ?? null,
      property_type_id: prop.propertyType?.id ?? null,
      city_id: 0,
      area_id: null,
      title: prop.title,
      slug: prop.slug,
      purpose: prop.purpose,
      rent_period: "",
      price: String(prop.price),
      downpayment: null,
      thumbnail_image: prop.thumbnailImage,
      description: prop.description,
      video_description: prop.video?.description || "",
      video_thumbnail: prop.video?.thumbnail || "",
      video_id: prop.video?.videoId || "",
      address: prop.address.text,
      address_description: prop.address.description,
      google_map: prop.address.googleMap,
      total_area: prop.details.totalArea,
      total_unit: prop.details.totalUnit,
      total_bedroom: prop.details.totalBedroom,
      total_bathroom: prop.details.totalBathroom,
      total_garage: prop.details.totalGarage,
      total_kitchen: prop.details.totalKitchen,
      is_featured: prop.flags.isFeatured ? "1" : "0",
      is_top: prop.flags.isTop ? "1" : "0",
      is_urgent: prop.flags.isUrgent ? "1" : "0",
      status: prop.flags.status,
      expired_date: prop.expiredDate,
      seo_title: prop.seo.title,
      seo_meta_description: prop.seo.metaDescription,
      serial: 0,
      show_slider: "1",
      approve_by_admin: "1",
      created_at: prop.createdAt,
      updated_at: prop.updatedAt,
      date_from: null,
      date_to: null,
      time_from: null,
      time_to: null,
      country_id: 0,
      lat: prop.address.lat,
      lon: prop.address.lng,
      resale_or_primary: prop.saleType,
      compound_id: prop.compoundId,
      developer_id: prop.developer?.id ?? null,
      show_map: prop.address.googleMap ? 1 : 0,
      totalRating: 0,
      ratingAvarage: null,
      customer_services: [],
      sliders: [],
      aminities: [],
      nearest_locations: [],
      plans: [],
      compound: prop.compound,
      area: prop.area,
      developer: prop.developer,
      property_type: prop.propertyType ? {
        name: prop.propertyType.name,
      } : null,
      agent: prop.agent,
    })) as Property[];

    return (
      <>
        <div className="w-full grid gap-5 pb-2 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-6" dir={isArabic ? "rtl" : "ltr"}>
          {convertedProperties.map((property) => (
            <OppertunitiesCard key={property.id} property={property} />
          ))}
        </div>

        {showPagination && (
          <CompoundPropertiesPagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}
      </>
    );
  };

  return (
    <div className="mt-8">
      <h3 className="sm:text-h5-semibold md:text-h4-semibold text-h6-semibold text-primary mb-4">{t("title")}</h3>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className={cn("mb-6!", isArabic ? "flex-row-reverse" : "flex-row")}>
          <TabsTrigger value="all">{t("tabs.all")}</TabsTrigger>
          <TabsTrigger value="primary">{t("tabs.primary")}</TabsTrigger>
          <TabsTrigger value="resale">{t("tabs.resale")}</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderPropertiesTab(allProperties, allMeta)}
        </TabsContent>

        <TabsContent value="primary">
          {renderPropertiesTab(primaryProperties, primaryMeta)}
        </TabsContent>

        <TabsContent value="resale">
          {renderPropertiesTab(resaleProperties, resaleMeta)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

