import Empty from "@/components/shared/Empty";
import { Link } from "@/i18n/navigation";
import { getDevelopers } from "@/lib/apis/developers/developers.api";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function DevelopersList() {
  const t = await getTranslations("AllDevelopersPage");

  // Fetch developers
  const developers = await getDevelopers();
  const developersData = developers?.data || [];

  // Handle empty data
  if (!developersData || developersData.length === 0) return <Empty>{t("empty-state")}</Empty>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 items-stretch mt-6">
      {developersData.map((developer) => (
        <Link
          key={developer.id}
          href={`/developers/${developer.id}`}
          className="flex flex-col rounded-lg bg-white shadow-[0_10px_40px_0_rgba(24,26,32,0.08)] hover:shadow-[0_20px_60px_0_rgba(24,26,32,0.12)] transition-shadow p-2"
        >
          {/* Logo */}
          <div className="relative w-full h-[180px] flex items-center justify-center p-6">
            <Image
              src={developer?.logo_url || "/images/home/hero-red-circle.svg"}
              alt={developer.name}
              fill
              className="object-contain"
              priority
              quality={75}
            />
          </div>

          {/* Title */}
          <div className="text-center p-5">
            <p className="text-h5-semibold md:text-h6-semibold text-black">
              {developer.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
