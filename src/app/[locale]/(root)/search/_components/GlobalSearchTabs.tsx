"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  totalCounts: {
    all: number;
    properties: number;
    developers: number;
    compounds: number;
    areas: number;
    cities: number;
  };
  search: string;
  children: React.ReactNode;
};

export default function GlobalSearchTabs({ totalCounts, search, children }: Props) {
  // translations
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("GlobalSearchPage.tabs");

  const [currentTab, setCurrentTab] = useState("all");

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mt-6" dir={isArabic ? "rtl" : "ltr"}>
      <TabsList className="flex-wrap h-auto">
        <TabsTrigger value="all">
          {t("all")} {totalCounts.all > 0 && <span className="ml-2 text-primary">({totalCounts.all})</span>}
        </TabsTrigger>
        <TabsTrigger value="properties">
          {t("properties")} {totalCounts.properties > 0 && <span className="ml-2 text-primary">({totalCounts.properties})</span>}
        </TabsTrigger>
        <TabsTrigger value="developers">
          {t("developers")} {totalCounts.developers > 0 && <span className="ml-2 text-primary">({totalCounts.developers})</span>}
        </TabsTrigger>
        <TabsTrigger value="compounds">
          {t("compounds")} {totalCounts.compounds > 0 && <span className="ml-2 text-primary">({totalCounts.compounds})</span>}
        </TabsTrigger>
        <TabsTrigger value="areas">
          {t("areas")} {totalCounts.areas > 0 && <span className="ml-2 text-primary">({totalCounts.areas})</span>}
        </TabsTrigger>
        <TabsTrigger value="cities">
          {t("cities")} {totalCounts.cities > 0 && <span className="ml-2 text-primary">({totalCounts.cities})</span>}
        </TabsTrigger>
      </TabsList>

      {children}
    </Tabs>
  );
}

