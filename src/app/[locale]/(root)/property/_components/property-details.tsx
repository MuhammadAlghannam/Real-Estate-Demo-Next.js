import ParserHTMLRenderer from "@/components/shared/ParserHTMLRenderer";
import { Bath, Bed, Car, LandPlot, Utensils } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface Props {
  property: Property
  additionalInformations: AdditionalInformation[]
  nearestLocations: NearestLocation[]
  aminities: PropertyAminity[]
  features: PropertyFeature[]
}

export default async function PropertyDetails({ property, additionalInformations, nearestLocations, aminities, features }: Props) {
  const t = await getTranslations("PropertySinglePage.property-details");
  const hasCoreDetails = [
    property.total_area,
    property.total_unit,
    property.total_bedroom,
    property.total_bathroom,
    property.total_garage,
    property.total_kitchen,
  ].some(Boolean);
  const hasDescription = Boolean(property.description && property.description.trim() !== "");

  return (
    <>
      {/* Property Details */}
      {hasCoreDetails && (
        <div className="mt-6 border-b border-border pb-4">
          <h2 className="md:text-h4-semibold text-h5-semibold text-black">{t("title")}</h2>
          <div className="mt-4 grid md:grid-cols-4 grid-cols-2 sm:gap-x-18 gap-x-12 gap-y-4">
            <div className="flex items-center gap-2">
              <LandPlot className="w-5 h-5 text-primary" />
              <h5 className="text-h6-regular">{t("area")} <span className="text-h6-semibold">{property.total_area}</span></h5>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-primary" />
              <h5 className="text-h6-regular">{t("bedrooms")} <span className="text-h6-semibold">{property.total_bedroom}</span></h5>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-primary" />
              <h5 className="text-h6-regular">{t("bathrooms")} <span className="text-h6-semibold">{property.total_bathroom}</span></h5>
            </div>
            {property.total_garage && Number(property.total_garage) > 0 && (
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                <h5 className="text-h6-regular">{t("garage")} <span className="text-h6-semibold">✅</span></h5>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              <h5 className="text-h6-regular">{t("kitchen")} <span className="text-h6-semibold">{property.total_kitchen
              }</span></h5>
            </div>
          </div>
        </div>
      )}

      {/* Property Description */}
      {hasDescription && (
        <div className="mt-4 border-b border-border pb-4">
          <h2 className="md:text-h4-semibold text-h5-semibold text-black">{t("description-title")}</h2>
          <ParserHTMLRenderer htmlContent={property.description} className="mt-3 md:text-h6-regular text-h7-regular text-black" />
        </div>
      )}

      {/* Additional Details */}
      {additionalInformations?.length > 0 && (
        <div className="mt-4 border-b border-border pb-4">
          <h2 className="md:text-h4-semibold text-h5-semibold text-black">{t("additional-details-title")}</h2>
          <div className="mt-4 grid md:grid-cols-4 grid-cols-2 sm:gap-x-18 gap-x-2 gap-y-4">
            {additionalInformations?.map((info) => {
              const key = info.add_key ?? "";
              const value = (info.add_value ?? "").trim();
              const lower = value.toLowerCase();
              const isYes = lower === "yes";
              const isNo = lower === "no";

              return (
                <div key={info.id} className="flex items-center gap-2">
                  {key === "Building Age" ? (
                    <h5 className="text-h6-regular">
                      {key}: <span className="text-h6-semibold">{value}</span>
                    </h5>
                  ) : (
                    <h5 className="text-h6-regular">
                      <span className="text-h6-semibold">{isYes ? "✅" : isNo ? "❌" : value}</span> {key}
                    </h5>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Nearest Location */}
      {nearestLocations?.length > 0 && (
        <div className="mt-4 border-b border-border pb-4">
          <h2 className="md:text-h4-semibold text-h5-semibold text-black">{t("nearest-location-title")}</h2>
          <div className="mt-4 grid md:grid-cols-4 grid-cols-2 sm:gap-x-18 gap-x-5 gap-y-4">
            {nearestLocations?.map((item) => (
              <div key={item.id} className="flex items-center md:justify-start justify-between md:gap-3 gpa-0">
                <h5 className="text-h6-regular">{item.location?.location || ""}:</h5>
                <span className="text-h6-semibold">{item.distance} KM</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      {aminities?.length > 0 ? (
        <div className="mt-4 border-b border-border pb-4">
          <h2 className="md:text-h4-semibold text-h5-semibold text-black">{t("amenities-title")}</h2>
          <div className="mt-4 grid md:grid-cols-4 grid-cols-2 sm:gap-x-18 gap-x-5 gap-y-3">
            {aminities?.map((item) => (
              <div key={item.id} className="flex items-start gap-2">
                <span className="sm:text-h6-regular text-h7-regular">✅</span>
                <h5 className="sm:text-h6-regular text-h7-regular">{item?.aminity?.aminity || ""}</h5>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Features */}
      {features?.length > 0 ? (

        <div className="mt-4 border-b border-border pb-4">
          <h2 className="md:text-h4-semibold text-h5-semibold text-black">{t("features-title")}</h2>
          <div className="mt-4 grid md:grid-cols-4 grid-cols-2 sm:gap-x-18 gap-x-5 gap-y-3">
            {features?.map((item) => (

              <div key={item.id} className="flex items-start gap-2">
                <span className="sm:text-h6-regular text-h7-regular">✅</span>
                <h5 className="sm:text-h6-regular text-h7-regular">{item?.feature?.name || ""}</h5>
              </div>
            ))}
          </div>
        </div>
      ) : null}


      {/* Google Map */}
      {property.google_map && (
        <div className="mt-4 pb-4">
          <h2 className="md:text-h4-semibold text-h5-semibold text-black">{t("location-map-title")}</h2>
          <div className="mt-4 w-full">
            <div
              className="w-full h-96 rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{ __html: property.google_map }}
            />
          </div>
        </div>
      )}
    </>
  )
}