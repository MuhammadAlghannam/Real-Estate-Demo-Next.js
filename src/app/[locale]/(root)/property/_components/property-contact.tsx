"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import useIncrementCustomer from "../_hooks/use-increment-customer";

interface PropertyContactProps {
  property_customer_services: CustomerService[];
  property_slug: string;
}

export default function PropertyContact({ property_customer_services, property_slug }: PropertyContactProps) {
  // Hooks
  const { mutate: incrementCustomer, isPending: isIncrementCustomerPending } = useIncrementCustomer();
  const t = useTranslations("PropertySinglePage.contact-modal");

  // Get all phones from all customer services
  const allPhones = property_customer_services.flatMap(service =>
    service.phones.map(phone => ({
      ...phone,
      customer_service_id: service.id,
    }))
  );

  // Handlers
  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>, customer_service_id: number, phone_id: number, phone: string) => {
    e.preventDefault();
    incrementCustomer({
      property_slug,
      customer_service_id,
      phone_id,
    });
    // Open phone dialer
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsAppClick = (customer_service_id: number, phone_id: number, phone: string) => {
    incrementCustomer({
      property_slug,
      customer_service_id,
      phone_id,
    });
    // Open WhatsApp in new tab
    window.open(`https://api.whatsapp.com/send?phone=${phone}`, '_blank', 'noopener,noreferrer');
  };

  if (allPhones.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-gray-50 w-12 h-12 leading-12 cursor-pointer rounded-full flex items-center justify-center">
            <Phone className="h-5 w-5 text-primary" fill="#b12028" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-h4-semibold text-black">{t("title")}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="flex flex-col space-y-3 py-4">
            {/* All Phones */}
            {allPhones.map((phoneData) => (
              <div
                key={phoneData.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg gap-3"
              >
                {/* Phone Number on Left */}
                <span className="text-h6-regular text-text-gray-dark flex-1">
                  {phoneData.phone}
                </span>

                {/* Icons on Right */}
                <div className="flex items-center gap-2">
                  {/* Phone Icon */}
                  <a
                    href={`tel:${phoneData.phone}`}
                    onClick={(e) => handlePhoneClick(e, phoneData.customer_service_id, phoneData.id, phoneData.phone)}
                    className="bg-gray-50 w-9 h-9 leading-9 cursor-pointer rounded-full flex items-center justify-center"
                    aria-label={t("aria-labels.call", { phone: phoneData.phone })}
                  >
                    <Phone className="h-4 w-4 text-primary" fill="#b12028" />
                  </a>

                  {/* WhatsApp Icon */}
                  <button
                    onClick={() => handleWhatsAppClick(phoneData.customer_service_id, phoneData.id, phoneData.phone)}
                    className="p-2 bg-white rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                    aria-label={t("aria-labels.whatsapp", { phone: phoneData.phone })}
                    disabled={isIncrementCustomerPending}
                  >
                    <Image
                      src="/images/icons/whatsapp.svg"
                      alt={t("alt.whatsapp")}
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
