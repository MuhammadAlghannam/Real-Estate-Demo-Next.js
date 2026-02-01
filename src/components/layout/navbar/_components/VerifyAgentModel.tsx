"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import VerifyAgentForm from "./VerifyAgentForm";

interface VerifyAgentModelProps {
  children?: React.ReactNode;
}

export default function VerifyAgentModel({ children }: VerifyAgentModelProps) {
  // Translation
  const t = useTranslations("VerifyAgent");
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <button className="flex items-center gap-2 text-h6-regular text-black hover:text-primary transition-colors">
            <ShieldCheck className="w-5 h-5" />
            <span>{t("verify-agent")}</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl sm:p-10 p-5">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <Image
              src={"/images/home/phone-verfiy.svg"}
              alt={t("alt.verify-phone")}
              width={102}
              height={102}
              className="sm:w-[102px] sm:h-[102px] w-[80px] h-[80px]"
              priority
              quality={75}
            />

          </DialogTitle>
          <DialogDescription className="!text-h5-semibold sm:!text-h4-semibold text-text-black text-center sm:mt-4 mt-2">
            {t("title")}
          </DialogDescription>
          <p className="text-h7-regular sm:text-h6-regular text-black text-center">{t("description.part1")} <span className="text-primary">{t("description.brand")}</span>{t("description.part2")}</p>
        </DialogHeader>

        <div className="sm:mt-4 mt-2">
          <VerifyAgentForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
