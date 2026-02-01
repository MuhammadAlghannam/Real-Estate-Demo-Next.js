import OppertunitiesCard from "@/components/features/oppertunities/OppertunitiesCard";
import Empty from "@/components/shared/Empty";
import { Link } from "@/i18n/navigation";
import { getGlobalSearch } from "@/lib/apis/global/global-search.api";
import { getTranslations } from "next-intl/server";
import Image from "next/image";


type Props = {
  search: string;
  tab: string;
  locale: string;
};

export default async function GlobalSearchResults({ search, tab, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'GlobalSearchPage' });

  // If no search query, show empty state
  if (!search || search.trim() === "") {
    return <Empty>{t("results.empty-state")}</Empty>;
  }

  // Fetch search results
  const results = await getGlobalSearch(search);

  if (!results || !results.success || !results.data) {
    return <Empty>{t("results.no-results", { search })}</Empty>;
  }

  const { developers, compounds, areas, cities, properties } = results.data;

  // Check if all arrays are empty (no results)
  const hasNoResults =
    developers.length === 0 &&
    compounds.length === 0 &&
    areas.length === 0 &&
    cities.length === 0 &&
    properties.length === 0;

  if (hasNoResults) {
    return <Empty>{t("results.no-results", { search })}</Empty>;
  }

  // Calculate totals
  const totalCount =
    developers.length +
    compounds.length +
    areas.length +
    cities.length +
    properties.length;

  // Convert GlobalSearchProperty to Property format for OppertunitiesCard
  const convertToProperty = (prop: GlobalSearchProperty): Property => {
    return {
      id: prop.id,
      title: prop.title,
      slug: prop.slug,
      price: prop.price,
      purpose: prop.purpose,
      rent_period: prop.rent_period,
      address: prop.address,
      city_id: prop.city_id,
      area_id: prop.area_id,
      compound_id: prop.compound_id,
      developer_id: prop.developer_id,
      downpayment: prop.downpayment,
      totalRating: prop.totalRating,
      ratingAvarage: prop.ratingAvarage,
      property_type_name: prop.property_type_name,
      developer_name: prop.developer_name,
      developer_image: prop.developer_image,
      is_favorited: prop.is_favorited,
      thumbnail_image: prop.thumbnail_image || "/images/home/compound-1.png", // Placeholder since search results don't include thumbnail
      description: prop.description || "",
      video_description: prop.video_description || "",
      video_thumbnail: "",
      video_id: "",
      address_description: prop.address_description || "",
      google_map: null,
      total_area: "",
      total_unit: "",
      total_bedroom: "",
      total_bathroom: "",
      total_garage: "",
      total_kitchen: "",
      is_featured: "0",
      is_top: "0",
      is_urgent: "0",
      status: "1",
      expired_date: null,
      seo_title: prop.seo_title || "",
      seo_meta_description: prop.seo_meta_description || "",
      serial: 0,
      show_slider: "0",
      approve_by_admin: "1",
      created_at: "",
      updated_at: "",
      date_from: null,
      date_to: null,
      time_from: null,
      time_to: null,
      country_id: 0,
      lat: null,
      lon: null,
      resale_or_primary: null,
      show_map: 0,
      agent_id: null,
      property_type_id: 0,
      developer: prop.developer
        ? {
          id: prop.developer.id,
          name: prop.developer.name,
          email: null,
          logo_path: prop.developer_image,
          description: null,
          created_at: "",
          updated_at: "",
        }
        : null,
      compound: prop.compound,
      area: prop.area,
      city: prop.city,
      property_type: prop.property_type,
      agent: null,
    } as Property;
  };

  // Render based on selected tab
  if (tab === "properties") {
    if (properties.length === 0) {
      return <Empty>{t("results.no-properties", { search })}</Empty>;
    }
    return (
      <div className="w-full grid gap-5 pb-2 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-6">
        {properties.map((property) => (
          <OppertunitiesCard key={property.id} property={convertToProperty(property)} />
        ))}
      </div>
    );
  }

  if (tab === "developers") {
    if (developers.length === 0) {
      return <Empty>{t("results.no-developers", { search })}</Empty>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 items-stretch mt-6">
        {developers.map((developer) => (
          <Link
            key={developer.id}
            href={`/developers/${developer.id}`}
            className="flex flex-col rounded-lg bg-white shadow-[0_10px_40px_0_rgba(24,26,32,0.08)] hover:shadow-[0_20px_60px_0_rgba(24,26,32,0.12)] transition-shadow p-2"
          >
            <div className="relative w-full h-[180px] flex items-center justify-center p-6">
              <Image
                src={developer.logo_url || "/images/home/hero-red-circle.svg"}
                alt={developer.name}
                fill
                className="object-contain"
                priority
                quality={75}
              />
            </div>
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

  if (tab === "compounds") {
    if (compounds.length === 0) {
      return <Empty>{t("results.no-compounds", { search })}</Empty>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mt-6">
        {compounds.map((compound) => {
          const imageUrl = compound.images?.[0]?.url;

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
                    imageUrl ||
                    "/images/home/compound-1.png"
                  }
                  alt={compound.name}
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
                  {compound.name}
                </p>
                <p className="text-h6-regular md:text-h7-regular text-[#181A20] text-center">
                  {compound.area.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  if (tab === "areas") {
    if (areas.length === 0) {
      return <Empty>{t("results.no-areas", { search })}</Empty>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {areas.map((area) => (
          <Link
            key={area.id}
            href={`/properties?area_id=${area.id}`}
            className="flex items-center p-4 rounded-lg bg-white shadow-[0_10px_40px_0_rgba(24,26,32,0.08)] hover:shadow-[0_20px_60px_0_rgba(24,26,32,0.12)] transition-shadow"
          >
            <p className="text-h5-semibold text-black">{area.name}</p>
          </Link>
        ))}
      </div>
    );
  }

  if (tab === "cities") {
    if (cities.length === 0) {
      return <Empty>{t("results.no-cities", { search })}</Empty>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={`/properties?city_id=${city.id}`}
            className="flex flex-col p-4 rounded-lg bg-white shadow-[0_10px_40px_0_rgba(24,26,32,0.08)] hover:shadow-[0_20px_60px_0_rgba(24,26,32,0.12)] transition-shadow"
          >
            <p className="text-h5-semibold text-black">{city.name}</p>
            {city.country && (
              <p className="text-h6-regular text-text-gray-dark mt-1">
                {city.country.name}
              </p>
            )}
            {city.totalProperty > 0 && (
              <p className="text-h7-regular text-primary mt-1">
                {city.totalProperty} {city.totalProperty === 1 ? t("city.property") : t("city.properties")}
              </p>
            )}
          </Link>
        ))}
      </div>
    );
  }

  // "All" tab - show all results with sections
  if (totalCount === 0) {
    return <Empty>{t("results.no-results", { search })}</Empty>;
  }

  return (
    <div className="mt-6 space-y-8">
      {/* Properties Section */}
      {properties.length > 0 && (
        <div>
          <h3 className="text-h4-semibold text-black mb-4">
            {t("sections.properties")} <span className="text-primary">{properties.length}</span>
          </h3>
          <div className="w-full grid gap-5 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
            {properties.slice(0, 10).map((property) => (
              <OppertunitiesCard key={property.id} property={convertToProperty(property)} />
            ))}
          </div>
        </div>
      )}

      {/* Developers Section */}
      {developers.length > 0 && (
        <div>
          <h3 className="text-h4-semibold text-black mb-4">
            {t("sections.developers")} <span className="text-primary">{developers.length}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 items-stretch">
            {developers.slice(0, 6).map((developer) => (
              <Link
                key={developer.id}
                href={`/developers/${developer.id}`}
                className="flex flex-col rounded-lg bg-white shadow-[0_10px_40px_0_rgba(24,26,32,0.08)] hover:shadow-[0_20px_60px_0_rgba(24,26,32,0.12)] transition-shadow p-2"
              >
                <div className="relative w-full h-[180px] flex items-center justify-center p-6">
                  <Image
                    src={developer.logo_url || "/images/home/hero-red-circle.svg"}
                    alt={developer.name}
                    fill
                    className="object-contain"
                    priority
                    quality={75}
                  />
                </div>
                <div className="text-center p-5">
                  <p className="text-h5-semibold md:text-h6-semibold text-black">
                    {developer.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Compounds Section */}
      {compounds.length > 0 && (
        <div>
          <h3 className="text-h4-semibold text-black mb-4">
            {t("sections.compounds")} <span className="text-primary">{compounds.length}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {compounds.slice(0, 6).map((compound) => {
              const imageUrl = compound.images?.[0]?.url;

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
                        imageUrl ||
                        "/images/home/compound-1.png"
                      }
                      alt={compound.name}
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
                      {compound.name}
                    </p>
                    <p className="text-h6-regular md:text-h7-regular text-[#181A20] text-center">
                      {compound.area.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Areas Section */}
      {areas.length > 0 && (
        <div>
          <h3 className="text-h4-semibold text-black mb-4">
            {t("sections.areas")} <span className="text-primary">{areas.length}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.slice(0, 6).map((area) => (
              <Link
                key={area.id}
                href={`/properties?area_id=${area.id}`}
                className="flex items-center p-4 rounded-lg bg-white shadow-[0_10px_40px_0_rgba(24,26,32,0.08)] hover:shadow-[0_20px_60px_0_rgba(24,26,32,0.12)] transition-shadow"
              >
                <p className="text-h5-semibold text-black">{area.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Cities Section */}
      {cities.length > 0 && (
        <div>
          <h3 className="text-h4-semibold text-black mb-4">
            {t("sections.cities")} <span className="text-primary">{cities.length}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.slice(0, 6).map((city) => (
              <Link
                key={city.id}
                href={`/properties?city_id=${city.id}`}
                className="flex flex-col p-4 rounded-lg bg-white shadow-[0_10px_40px_0_rgba(24,26,32,0.08)] hover:shadow-[0_20px_60px_0_rgba(24,26,32,0.12)] transition-shadow"
              >
                <p className="text-h5-semibold text-black">{city.name}</p>
                {city.country && (
                  <p className="text-h6-regular text-text-gray-dark mt-1">
                    {city.country.name}
                  </p>
                )}
                {city.totalProperty > 0 && (
                  <p className="text-h7-regular text-primary mt-1">
                    {city.totalProperty} {city.totalProperty === 1 ? t("city.property") : t("city.properties")}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

