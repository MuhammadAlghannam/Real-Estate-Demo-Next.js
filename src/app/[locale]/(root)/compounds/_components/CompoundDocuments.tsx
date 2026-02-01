"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { File, Image as ImageIcon, MapPin, SquareArrowOutUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type CompoundDocumentsProps = {
  googleMap: GoogleMap;
  masterplanPdf?: string | null;
  masterplanImage?: string | null;
};

export default function CompoundDocuments({ googleMap, masterplanPdf, masterplanImage }: CompoundDocumentsProps) {
  const t = useTranslations("CompoundSinglePage.documents");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-3 flex-col py-4 md:flex-row">
      {/* Google Map Link */}
      {googleMap?.mapUrl && (
        <Link
          href={googleMap.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-2xl border-1 border-border px-6 py-4 hover:border-primary transition-colors"
        >
          <div className="flex items-center">
            <div className="p-4 bg-secondary rounded-lg">
              <MapPin className="text-primary w-5 h-5" />
            </div>

            <div className="flex flex-1 items-center justify-between ps-3">
              <div>
                <h2 className="text-h8-semibold">{t("location.title")}</h2>
                <p className="text-h8-regular text-text-gray-dark">{t("location.view-on-google-maps")}</p>
              </div>

              <div>
                <SquareArrowOutUpRight className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Master Plan PDF */}
      {masterplanPdf && (
        <Link
          href={masterplanPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-2xl border-1 border-border px-6 py-4 hover:border-primary transition-colors"
        >
          <div className="flex items-center">
            <div className="p-4 bg-secondary rounded-lg">
              <File className="text-primary w-5 h-5" />
            </div>

            <div className="flex flex-1 items-center justify-between ps-3">
              <div>
                <h2 className="text-h8-semibold">{t("master-plan.title")}</h2>
                <p className="text-h8-regular text-text-gray-dark">{t("master-plan.pdf")}</p>
              </div>

              <div>
                <SquareArrowOutUpRight className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Master Plan Image */}
      {masterplanImage && (
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex-1 rounded-2xl border-1 border-border px-6 py-4 hover:border-primary transition-colors cursor-pointer text-left">
              <div className="flex items-center">
                <div className="p-4 bg-secondary rounded-lg">
                  <ImageIcon className="text-primary w-5 h-5" />
                </div>

                <div className="flex flex-1 items-center justify-between ps-3">
                  <div>
                    <h2 className="text-h8-semibold">{t("master-plan.title")}</h2>
                    <p className="text-h8-regular text-text-gray-dark">{t("master-plan.view-image")}</p>
                  </div>

                  <div>
                    <SquareArrowOutUpRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl w-full p-4 sm:p-6">
            <div className="relative w-full max-h-[90vh] overflow-auto">
              <img
                src={masterplanImage}
                alt={t("master-plan.alt")}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

