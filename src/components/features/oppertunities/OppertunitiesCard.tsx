import CustomeBtn from "@/components/shared/CustomeBtn";
import TruncateWords from "@/components/shared/TruncateWords";
import { formatCurrency, htmlToPlainText, noLinkImage, prettifyLabel } from '@/lib/utils/helper';
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import OppertunitiesCardTop from "./OppertunitiesCardTop";

export default function OppertunitiesCard({ property, isFavoritePage }: { property: Property, isFavoritePage?: boolean }) {
  const t = useTranslations("OppertunitiesCard");
  const format = useFormatter();

  return (
    <div
      className="bg-no-repeat bg-cover rounded-lg sm:p-6 p-4"
      style={{ backgroundImage: `url(${noLinkImage(property.thumbnail_image)})` }}
    >
      <div className="flex flex-col justify-between sm:gap-18 gap-12">
        {/* top */}
        <OppertunitiesCardTop propertyId={property.id} isFavorited={isFavoritePage ? true : property.is_favorited} />

        {/* bottom */}
        <div className="p-6 sm:p-4 bg-white rounded-lg">
          <div className="flex md:flex-row flex-col-reverse justify-between md:items-center items-start md:gap-0 gap-2">
            <h3 className="md:text-h4-semibold text-h5-semibold text-primary">
              {formatCurrency(property.price, format)}
            </h3>

            <div className="flex gap-3 flex-1 w-full justify-end items-center min-h-13">
              {property.developer?.logo_path && (
                <div className="w-13 h-13 leading-13 flex justify-center items-center p-2.5 shadow-md rounded-full">
                  <Image
                    src={noLinkImage(property.developer?.logo_path ?? '')}
                    alt={t("alt.developer-logo")}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    quality={75}
                  />
                </div>
              )}

              {property.property_type?.name && (
                <h4 className="text-h7-regular text-primary bg-secondary px-3 py-2 rounded-3xl h-fit">
                  {prettifyLabel(property.property_type?.name ?? '')}
                </h4>
              )}
            </div>
          </div>

          <div className="min-h-14 md:min-h-16">
            <TruncateWords maxWords={11} className="md:text-h5-semibold text-h5-semibold text-black mt-1">{htmlToPlainText(property.title)}</TruncateWords>
          </div>
          <TruncateWords maxWords={5} className="md:text-h6-regular text-h7-regular text-text-gray-dark">
            {htmlToPlainText(property.description)}
          </TruncateWords>

          <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-3 mt-6">
            <TruncateWords maxWords={3} className="text-h7-regular text-black">{property.address}</TruncateWords>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <h5 className="text-h7-regular text-black">{property.total_area || 0}</h5>
                <h5 className="text-h7-semibold text-black">{t("sq-ft")}</h5>
              </div>
              <div className="text-center">
                <h5 className="text-h7-regular text-black">{property.total_bedroom || 0}</h5>
                <h5 className="text-h7-semibold text-black">{t("rooms")}</h5>
              </div>
              <div className="text-center">
                <h5 className="text-h7-regular text-black">{property.total_bathroom || 0}</h5>
                <h5 className="text-h7-semibold text-black">{t("bath")}</h5>
              </div>
            </div>
          </div>

          <CustomeBtn href={`/property/${property.slug}`} className="w-full mt-6">
            {t("view-property-details")}
          </CustomeBtn>
        </div>
      </div>
    </div>
  )
}
