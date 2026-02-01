import OppertunitiesCard from "@/components/features/oppertunities/OppertunitiesCard";
import Empty from "@/components/shared/Empty";
import { getWishlistedProperties } from "@/lib/apis/properties/wishlists.api";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import FavoritesPagination from "./FavoritesPagination";


type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function FavoritesList({ searchParams }: Props) {
  // Translation
  const t = await getTranslations("FavoritesPage");

  // Search Params
  const params = await searchParams;
  const page = Number(params.page) || 1;

  // data
  let payload;
  try {
    payload = await getWishlistedProperties(page);
  } catch (error) {
    // Check for expired refresh token and redirect to logout
    if (error instanceof Error && error.message === "RefreshTokenExpiredError") {
      redirect("/api/auth/logout");
    }
    throw error;
  }
  const properties = payload?.properties?.data ?? [];
  const meta = payload?.properties;

  // Variables
  const hasItems = Array.isArray(properties) && properties.length > 0;
  const totalPages = meta?.last_page ?? 1;
  const currentPage = meta?.current_page ?? 1;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const showPagination = hasItems && totalPages > 1;

  if (!hasItems) return <Empty>{t("empty-state")}</Empty>;

  return (
    <>
      <div className="w-full grid gap-5 pb-2 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {properties.map((property) => (
          <OppertunitiesCard key={property.id} property={property} isFavoritePage />
        ))}
      </div>

      {showPagination && (
        <FavoritesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      )}
    </>
  );
}
