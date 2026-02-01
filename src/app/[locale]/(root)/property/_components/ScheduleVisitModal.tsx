"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import ScheduleAVisitform from "./schedule-a-visit-form";

interface ScheduleVisitModalProps {
  slug: string;
}

export default function ScheduleVisitModal({ slug }: ScheduleVisitModalProps) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const t = useTranslations("PropertySinglePage.schedule-visit");

  const handleClose = () => {
    setOpen(false);
  };

  const handleTriggerClick = () => {
    if (!session?.user) {
      toast.error(t("login-required"));
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <CustomeBtn onClick={handleTriggerClick}>{t("button")}</CustomeBtn>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-h4-semibold text-black">
              {t("modal-title")}
            </DialogTitle>
            <DialogDescription className="text-h7-regular text-text-gray-dark">
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <ScheduleAVisitform onClose={handleClose} slug={slug} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
