import Empty from "@/components/shared/Empty";
import { getCompounds } from "@/lib/apis/compounds/compounds.api";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import CompoundsPagination from "./CompoundsPagination";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function CompoundsList({ searchParams }: Props) {
  const t = await getTranslations("AllCompoundsPage");

  // Search Params
  const params = await searchParams;
  const page = Number(params.page) || 1;

  // Fetch compounds
  const payload = await getCompounds(page);
  const compounds = payload?.data ?? [];
  const meta = payload?.meta;

  // Variables
  const hasItems = Array.isArray(compounds) && compounds.length > 0;
  const totalPages = meta?.last_page ?? 1;
  const currentPage = meta?.current_page ?? 1;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const showPagination = hasItems && totalPages > 1;

  // Handle empty data
  if (!hasItems) return <Empty>{t("empty-state")}</Empty>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mt-6">
        {compounds.map((compound) => {
          // const compoundNumbers = compound.paymentPlans?.length || 0;

          return (
            <Link
              key={compound.id}
              href={`/compounds/${compound.id}`}
              className="flex flex-col rounded-lg bg-white shadow-[0_10px_40px_0_rgba(24,26,32,0.08)]"
            >
              {/* Image */}
              <div className="relative w-full h-[180px]">
                <Image
                  src={
                    compound?.images?.[0]?.url ||
                    "/images/home/compound-1.png"
                  }
                  alt={compound.name}
                  fill
                  className="object-cover rounded-t-lg"
                  priority
                  quality={75}
                />
              </div>

              {/* Title */}
              <div className="text-center p-5 flex flex-col gap-1.5">
                <p className="text-h5-semibold md:text-h6-semibold text-black">
                  {compound.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {showPagination && (
        <CompoundsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      )}
    </>
  );
}

