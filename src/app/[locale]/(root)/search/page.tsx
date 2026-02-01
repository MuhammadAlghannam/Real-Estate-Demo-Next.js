import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { getGlobalSearch } from "@/lib/apis/global/global-search.api";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import GlobalSearchInput from "./_components/GlobalSearchInput";
import GlobalSearchTabs from "./_components/GlobalSearchTabs";
import GlobalSearchTabsContent from "./_components/GlobalSearchTabsContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'GlobalSearchPage' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description')
  };
}

type Props = {
  searchParams: Promise<{ search?: string; tab?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const t = await getTranslations('GlobalSearchPage');
  const resolvedParams = await searchParams;
  const search = resolvedParams.search;

  // Calculate total counts if search exists
  let totalCounts = {
    all: 0,
    properties: 0,
    developers: 0,
    compounds: 0,
    areas: 0,
    cities: 0,
  };

  if (search && search.trim() !== "") {
    const results = await getGlobalSearch(search);
    if (results?.success && results.data) {
      const { developers, compounds, areas, cities, properties } = results.data;
      totalCounts = {
        all: developers.length + compounds.length + areas.length + cities.length + properties.length,
        properties: properties.length,
        developers: developers.length,
        compounds: compounds.length,
        areas: areas.length,
        cities: cities.length,
      };
    }
  }

  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      <h1 className="md:text-h1-semibold text-h2-semibold text-black mb-6 text-center">
        {t("title")}
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <GlobalSearchInput />
      </div>

      {/* Results Count */}
      {search && search.trim() !== "" && totalCounts.all > 0 && (
        <p className="text-h5-regular text-text-gray-dark text-center mb-4">
          {totalCounts.all} {totalCounts.all === 1 ? t("results.count.result") : t("results.count.results")} {t("results.count.for")} &quot;{search}&quot;
        </p>
      )}

      {/* Tabs and Results */}
      {search && search.trim() !== "" ? (
        <GlobalSearchTabs totalCounts={totalCounts} search={search || ""} >
          <Suspense fallback={<LoadingSpinner />}>
            <GlobalSearchTabsContent search={search || ""} />
          </Suspense>
        </GlobalSearchTabs>
      ) : (
        <p className="text-h5-regular text-text-gray-dark text-center py-10">
          {t("results.empty-state")}
        </p>
      )}
    </section>
  );
}
