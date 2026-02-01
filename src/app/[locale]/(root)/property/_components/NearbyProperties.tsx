import Empty from "@/components/shared/Empty";
import { propertyNearby } from "@/lib/apis/properties/property-nearby.api";
import { getTranslations } from "next-intl/server";
import NearbyPropertiesCarousel from "./NearbyPropertiesCarousel";

interface NearbyPropertiesProps {
  property: Property;
}

export default async function NearbyProperties({ property }: NearbyPropertiesProps) {
  // Translation
  const t = await getTranslations("PropertySinglePage");

  // Get lat/lng from the current property
  const lat = property.lat ? Number(property.lat) : null;
  const lng = property.lon ? Number(property.lon) : null;

  // Only fetch nearby properties if we have valid coordinates
  if (!lat || !lng) {
    return <Empty>{t("nearby-properties-empty-available")}</Empty>;
  }

  // Fetch nearby properties
  const nearbyData = await propertyNearby({ lat, lng });

  // Get properties and slice to 10
  const nearbyProperties = nearbyData.properties.slice(0, 10);

  if (nearbyProperties.length === 0) {
    return <Empty>{t("nearby-properties-empty-found")}</Empty>;
  }

  return <NearbyPropertiesCarousel properties={nearbyProperties} />;
}
