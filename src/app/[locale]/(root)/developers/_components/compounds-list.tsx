import Empty from "@/components/shared/Empty";
import { Link } from "@/i18n/navigation";
import { noLinkImage } from "@/lib/utils/helper";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type CompoundsListProps = {
  compoundsData: DeveloperCompoundLite[];
};

export default async function CompoundsList({ compoundsData }: CompoundsListProps) {
  const t = await getTranslations("DevelopersSinglePage.compounds-list");

  // Empty data
  if (!compoundsData || compoundsData.length === 0) {
    return <Empty>{t("empty-state")}</Empty>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 items-stretch mt-6">
      {compoundsData.map((compound) => (
        <Link
          key={compound.id}
          href={`/compounds/${compound.id}`}
          className="flex flex-col rounded-lg bg-white shadow-[0_10px_40px_0_rgba(24,26,32,0.08)] border border-border"
        >

          {/* Image */}
          <div className="relative w-full h-[180px]">
            <Image
              src={
                compound?.images?.[0]?.image_path
                  ? noLinkImage(`/storage/${compound.images[0].image_path}`)
                  : "/images/home/compound-1.png"
              }
              alt={compound?.name}
              fill
              className="object-cover rounded-t-lg"
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 16vw"
            />
          </div>

          {/* Title */}
          <div className="text-center p-5 flex flex-col gap-1.5">
            <p className="text-h5-semibold md:text-h6-semibold text-black">
              {compound?.name}
            </p>
            <p className="text-h6-regular md:text-h7-regular text-[#181A20] text-center">
              {compound.area?.name ?? ""}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
