import { Link } from "@/i18n/navigation";
import { getContactUs } from "@/lib/apis/contact-us/contact.api";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";


export default async function ContactUsBoxes() {
  // Translation
  const t = await getTranslations("ContactUsPage.contact-us-boxes");

  // data
  const contactUsData = await getContactUs();
  const contact = contactUsData?.contact;

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-6 pt-12 pb-20">
        {/* email */}
        <div className="p-6 border border-border rounded-lg">
          <div className="bg-secondary rounded-full p-2.5 w-fit">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-h5-semibold text-black mt-4 mb-3">{t("email-address")}</h2>
          <Link href={`mailto:${contact?.email}`} className="text-h6-regular text-text-gray-dark mt-2">{contact?.email}</Link>
        </div>

        {/* phone */}
        <div className="p-6 border border-border rounded-lg">
          <div className="bg-secondary rounded-full p-2.5 w-fit">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-h5-semibold text-black mt-4 mb-3">{t("phone-number")}</h2>
          <Link href={`tel:${contact?.phone}`} className="text-h6-regular text-text-gray-dark mt-2">{contact?.phone}</Link>
        </div>

        {/* address */}
        <div className="p-6 border border-border rounded-lg">
          <div className="bg-secondary rounded-full p-2.5 w-fit">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-h5-semibold text-black mt-4">{t("location")}</h2>
          <p className="text-h6-regular text-text-gray-dark mt-2">{contact?.address}</p>
        </div>
      </div>

      {/* Locarion */}
      <div className="mb-6">
        <h1 className="md:text-h2-semibold text-h3-semibold text-black text-center">{t("our-location")}</h1>
        <p className="text-h6-regular text-black text-center mt-1">{t("description")}</p>
      </div>

      <div className="w-full">
        <div
          className="w-full h-96 rounded-lg overflow-hidden"
          dangerouslySetInnerHTML={{ __html: contact?.map || '' }}
        />
      </div>
    </>
  )
}
