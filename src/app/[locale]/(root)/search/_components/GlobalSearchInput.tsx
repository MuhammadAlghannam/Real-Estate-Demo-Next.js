"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function GlobalSearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("GlobalSearchPage.input");

  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  // Debounced search handler
  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value.trim());
      params.delete("tab"); // Reset tab when searching
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, 500); // 500ms delay

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  // Sync search value with URL params
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchValue) {
      setSearchValue(urlSearch);
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-sm">
      <InputGroup className="h-12 py-3">
        <InputGroupAddon>
          <Search className="w-5 h-5 text-gray-500" />
        </InputGroupAddon>
        <InputGroupInput
          type="text"
          placeholder={t("placeholder")}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </InputGroup>
    </div>
  );
}

