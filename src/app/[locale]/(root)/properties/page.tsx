import { auth } from "@/auth";
import { getAllProperties } from "@/lib/apis/properties/properties.api";
import { getTranslations } from "next-intl/server";
import PropertiesTabs from "./_components/PropertiesTabs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AllPropertiesPage' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description')
  };
}

type Props = {
  searchParams: Promise<{
    page?: string;
    purpose?: string;
    search?: string;
    city_id?: string;
    area_id?: string;
    type?: string;
    "rooms[]"?: string | string[];
    "bath_rooms[]"?: string | string[];
    min_price?: string;
    max_price?: string;
    min_area?: string;
    max_area?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  // Search Params
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const purpose = params.purpose as 'sell' | 'rent' | undefined;
  const search = params.search;
  const cityId = params.city_id;
  const areaId = params.area_id;
  const type = params.type;

  // Parse rooms arrays
  const roomsParam = params["rooms[]"];
  const rooms = roomsParam
    ? (Array.isArray(roomsParam) ? roomsParam : [roomsParam]).map(Number).filter(Boolean)
    : undefined;

  const bathRoomsParam = params["bath_rooms[]"];
  const bath_rooms = bathRoomsParam
    ? (Array.isArray(bathRoomsParam) ? bathRoomsParam : [bathRoomsParam]).map(Number).filter(Boolean)
    : undefined;

  // Parse price and area ranges
  const min_price = params.min_price ? Number(params.min_price) : undefined;
  const max_price = params.max_price ? Number(params.max_price) : undefined;
  const min_area = params.min_area ? Number(params.min_area) : undefined;
  const max_area = params.max_area ? Number(params.max_area) : undefined;

  // data
  const session = await auth();

  // Fetch properties for both tabs
  const sellPropertiesResponse = await getAllProperties({
    userId: session?.user?.id,
    page,
    purpose: 'sell',
    search,
    cityId,
    areaId,
    type,
    rooms,
    bath_rooms,
    min_price,
    max_price,
    min_area,
    max_area,
  });

  const rentPropertiesResponse = await getAllProperties({
    userId: session?.user?.id,
    page,
    purpose: 'rent',
    search,
    cityId,
    areaId,
    type,
    rooms,
    bath_rooms,
    min_price,
    max_price,
    min_area,
    max_area,
  });

  // Extract data
  const sellProperties = sellPropertiesResponse?.properties?.data || [];
  const rentProperties = rentPropertiesResponse?.properties?.data || [];
  const propertyTypes = sellPropertiesResponse?.property_types || [];

  // Meta data
  const sellMeta = sellPropertiesResponse?.properties;
  const rentMeta = rentPropertiesResponse?.properties;

  // Get max values from responses (use the maximum of both sell and rent)
  const maxBedRoom = Math.max(
    sellPropertiesResponse?.max_bed_room || 0,
    rentPropertiesResponse?.max_bed_room || 0
  );
  const maxBathRoom = Math.max(
    sellPropertiesResponse?.max_bath_room || 0,
    rentPropertiesResponse?.max_bath_room || 0
  );
  const maxArea = Math.max(
    sellPropertiesResponse?.max_area || 0,
    rentPropertiesResponse?.max_area || 0
  );
  const maxPrice = Math.max(
    sellPropertiesResponse?.max_price || 0,
    rentPropertiesResponse?.max_price || 0
  );

  // Determine default tab based on purpose param (default to 'sell' if no purpose)
  const defaultTab = purpose === 'rent' ? 'rent' : 'sell';

  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      <PropertiesTabs
        sellProperties={sellProperties}
        rentProperties={rentProperties}
        sellMeta={sellMeta}
        rentMeta={rentMeta}
        defaultTab={defaultTab}
        propertyTypes={propertyTypes}
        maxBedRoom={maxBedRoom}
        maxBathRoom={maxBathRoom}
        maxArea={maxArea}
        maxPrice={maxPrice}
      />
    </section>
  )
}
