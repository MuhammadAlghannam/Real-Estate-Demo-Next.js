import CustomeBtn from "@/components/shared/CustomeBtn";
import Empty from "@/components/shared/Empty";
import { getContactUs } from "@/lib/apis/contact-us/contact.api";
import { htmlToPlainText } from "@/lib/utils/helper";
import { getTranslations } from "next-intl/server";
import ContactModal from "./ContactModal";

type OffersCardProps = {
  offersData: DeveloperOffer[];
};

export default async function OffersCard({ offersData }: OffersCardProps) {
  const t = await getTranslations("DevelopersSinglePage.offers-card");

  // Fetch contact data
  const contactUsData = await getContactUs();
  const contact = contactUsData?.contact;

  // Empty data
  if (!offersData || offersData.length === 0)
    return <Empty>{t("empty-state")}</Empty>;

  if (!contact) {
    return <Empty>{t("contact-not-available")}</Empty>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {offersData.map((offer) => (
        <div
          key={offer?.id}
          className="bg-white rounded-lg border border-border p-5 h-full flex flex-col"
        >
          {/* Offer Title */}
          <h3 className="text-h5-semibold md:text-h4-semibold text-black mb-1">
            {offer?.title}
          </h3>

          {/* Offer Description */}
          <p className="text-h7-regular md:text-h6-regular text-text-gray-dark mb-6 grow">
            {htmlToPlainText(offer?.description) || t("no-description")}
          </p>

          {/* Get offer Button */}
          <ContactModal contactData={{ phone: contact.phone, email: contact.email }}>
            <CustomeBtn className="w-full mt-auto">{t("get-offer")}</CustomeBtn>
          </ContactModal>
        </div>
      ))}
    </div>
  );
}
