"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DeleteAccountForm from "./DeleteAccountForm";

interface DeleteAccountBtnProps {
  className?: string;
  children?: React.ReactNode;
}

export default function DeleteAccountBtn({ className, children }: DeleteAccountBtnProps) {
  const t = useTranslations("DeleteAccountPage.delete-account-btn");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "px-4 py-2  rounded-lg  transition-colors cursor-pointer",
            className
          )}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-h4-semibold ">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-h7-regular text-gray-600">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <DeleteAccountForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
