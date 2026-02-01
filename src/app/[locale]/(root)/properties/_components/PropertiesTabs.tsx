"use client";

import OppertunitiesCard from "@/components/features/oppertunities/OppertunitiesCard";
import Empty from "@/components/shared/Empty";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PropertiesFilters from "./PropertiesFilters";
import PropertiesPagination from "./PropertiesPagination";
import PropertiesSearch from "./PropertiesSearch";

type Props = {
  sellProperties: Property[];
  rentProperties: Property[];
  sellMeta: Omit<PropertiesPagination, 'data'>;
  rentMeta: Omit<PropertiesPagination, 'data'>;
  defaultTab: string;
  propertyTypes: PropertyType[];
  maxBedRoom: number;
  maxBathRoom: number;
  maxArea: number;
  maxPrice: number;
};

export default function PropertiesTabs({
  sellProperties,
  rentProperties,
  sellMeta,
  rentMeta,
  defaultTab,
  propertyTypes,
  maxBedRoom,
  maxBathRoom,
  maxArea,
  maxPrice,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Translations
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("AllPropertiesPage");

  // Force purpose=sell in URL if no purpose is present
  useEffect(() => {
    const purpose = searchParams.get("purpose");
    if (!purpose) {
      const params = new URLSearchParams(searchParams);
      params.set("purpose", "sell");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page"); // Reset to page 1 when changing tabs
    params.set("purpose", value);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={defaultTab} onValueChange={handleTabChange} className="w-full" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-8">
        <TabsList className="flex-1">
          <TabsTrigger value="sell">{t("tabs.buy")}</TabsTrigger>
          {/* <TabsTrigger value="rent">{t("tabs.rent")}</TabsTrigger> */}
        </TabsList>

        <div className="flex items-center gap-4 flex-1 justify-end">
          {/* Search */}
          <PropertiesSearch />

          {/* Filters */}
          <PropertiesFilters
            propertyTypes={propertyTypes}
            maxBedRoom={maxBedRoom}
            maxBathRoom={maxBathRoom}
            maxArea={maxArea}
            maxPrice={maxPrice}
          />
        </div>
      </div>

      <TabsContent value="sell">
        <div className="mt-4 mb-2">
          <h2 className="sm:text-h3-semibold text-h4-semibold text-black">{t("tabs-content.sell-title")}</h2>
          <p className="text-sm text-gray-600">
            {sellMeta?.total || 0} {sellMeta?.total !== 1 ? t("tabs-content.results") : t("tabs-content.result")}
          </p>
        </div>
        {renderPropertiesTab(sellProperties, sellMeta, t)}
      </TabsContent>

      <TabsContent value="rent">
        <div className="mt-4 mb-2">
          <h2 className="sm:text-h3-semibold text-h4-semibold text-black">{t("tabs-content.rent-title")}</h2>
          <p className="text-sm text-gray-600">
            {rentMeta?.total || 0} {rentMeta?.total !== 1 ? t("tabs-content.results") : t("tabs-content.result")}
          </p>
        </div>
        {renderPropertiesTab(rentProperties, rentMeta, t)}
      </TabsContent>
    </Tabs>
  );
}

// Helper function to render properties grid with pagination
const renderPropertiesTab = (properties: Property[], meta: Omit<PropertiesPagination, 'data'>, t: (key: string) => string) => {
  const hasItems = Array.isArray(properties) && properties.length > 0;
  const totalPages = meta?.last_page ?? 1;
  const currentPage = meta?.current_page ?? 1;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const showPagination = hasItems && totalPages > 1;

  if (!hasItems) return <Empty>{t("empty-state")}</Empty>;

  return (
    <>
      <div className="w-full grid gap-5 pb-2 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-6">
        {properties.map((property) => (
          <OppertunitiesCard key={property.id} property={property} />
        ))}
      </div>

      {showPagination && (
        <PropertiesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      )}
    </>
  );
};