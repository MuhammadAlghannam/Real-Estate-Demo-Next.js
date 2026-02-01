"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ContactModalProps {
  children: React.ReactNode;
  contactData: {
    phone: string;
    email: string;
  };
}

export default function ContactModal({ children, contactData }: ContactModalProps) {
  const t = useTranslations("DevelopersSinglePage.contact-modal");

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Open phone dialer
    window.location.href = `tel:${contactData.phone}`;
  };

  const handleWhatsAppClick = () => {
    // Open WhatsApp in new tab
    window.open(`https://api.whatsapp.com/send?phone=${contactData.phone}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-h4-semibold text-black">{t("title")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-3 py-4">
          {/* Phone Number */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg gap-3">
            {/* Phone Number on Left */}
            <span className="text-h6-regular text-text-gray-dark flex-1">
              {contactData.phone}
            </span>

            {/* Icons on Right */}
            <div className="flex items-center gap-2">
              {/* Phone Icon */}
              <a
                href={`tel:${contactData.phone}`}
                onClick={handlePhoneClick}
                className="bg-gray-50 w-9 h-9 leading-9 cursor-pointer rounded-full flex items-center justify-center"
                aria-label={t("aria-labels.call", { phone: contactData.phone })}
              >
                <Phone className="h-4 w-4 text-primary" fill="#b12028" />
              </a>

              {/* WhatsApp Icon */}
              <button
                onClick={handleWhatsAppClick}
                className="p-2 bg-white rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                aria-label={t("aria-labels.whatsapp", { phone: contactData.phone })}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
