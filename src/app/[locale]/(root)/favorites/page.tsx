import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import FavoritesList from "./_components/FavoritesList";

// Metadata
export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "FavoritesPage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

type Props = {
  params: { locale: string };
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const t = await getTranslations("FavoritesPage");

  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      {/* Head */}
      <div className="mb-12">
        <h1 className="md:text-h1-semibold text-h2-semibold text-center">
          {t("title")}
        </h1>
        <p className="text-h5-regular text-center md:w-3/5 w-full mx-auto">
          {t("description")}
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <FavoritesList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
