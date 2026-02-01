"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import FilterForm from "./FilterForm";

type Props = {
  propertyTypes: PropertyType[];
  maxBedRoom: number;
  maxBathRoom: number;
  maxArea: number;
  maxPrice: number;
};

export default function PropertiesFilters({ propertyTypes, maxBedRoom, maxBathRoom, maxArea, maxPrice }: Props) {
  // Translations
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("AllPropertiesPage");

  // Variables
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // States
  const [open, setOpen] = useState(false);

  // Functions
  function handleReset() {
    const params = new URLSearchParams(searchParams);
    params.delete("city_id");
    params.delete("area_id");
    params.delete("type");
    params.delete("rooms[]");
    params.delete("bath_rooms[]");
    params.delete("min_price");
    params.delete("max_price");
    params.delete("min_area");
    params.delete("max_area");
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    setTimeout(() => {
      setOpen(false)
    }, 1000);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <CustomeBtn >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{t("filters.trigger")}</span>
        </CustomeBtn>
      </SheetTrigger>
      <SheetContent className="sm:w-[700px] w-full !max-w-[700px] overflow-y-auto" side={isArabic ? "left" : "right"}>
        <SheetHeader>
          <SheetTitle>{t("filters.title")}</SheetTitle>
          <SheetDescription>
            {t("filters.description")}
          </SheetDescription>
        </SheetHeader>

        <div className="py-2 px-4">
          <FilterForm
            onClose={() => setOpen(false)}
            propertyTypes={propertyTypes}
            maxBedRoom={maxBedRoom}
            maxBathRoom={maxBathRoom}
            maxArea={maxArea}
            maxPrice={maxPrice}
          />
        </div>

        <SheetFooter className="w-full">
          <div className={cn("flex gap-4", isArabic ? "flex-row-reverse" : "flex-row")}>
            <CustomeBtn
              type="button"
              variant="outline"
              className="cursor-pointer flex-1 !text-primary !bg-transparent !border !border-primary"
              onClick={handleReset}
            >
              {t("filters.reset")}
            </CustomeBtn>
            <Button type="submit" className="text-h6-regular text-white hover:bg-hover hover:text-white cursor-pointer py-5.5 px-6 transition-all duration-200 flex-1" form="form-rhf-filter-locations">
              {t("filters.apply")}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
