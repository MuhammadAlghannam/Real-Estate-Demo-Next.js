"use client"

import MainAvatar from "@/components/shared/MainAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { signOutAction } from "@/lib/actions/auth/auth-logout.action";
import { navbarLinks } from "@/lib/constants/nav-links";
import { cn } from "@/lib/utils";
import { noLinkImage } from "@/lib/utils/helper";
import { ChevronDown, LogOut } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

export default function UserDropDown({ initialUser }: { initialUser?: ApiUser }) {
  // translations
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const profileImg = noLinkImage(initialUser?.image ?? null);

  return (
    <DropdownMenu dir={isArabic ? "rtl" : "ltr"}>
      <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2">
        <MainAvatar src={profileImg} className="size-[50px]" />
        <ChevronDown className="w-5 h-5 text-primary" strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("p-1.5 rounded-lg  translate-y-[10px] w-[180px]", isArabic ? "translate-x-[45px]" : "translate-x-[-45px]")}>
        {navbarLinks
          .filter((item) => item.label === "Profile")
          .map((item) => {
            return (
              <React.Fragment key={item.label}>
                <Link href={item.href} >
                  <DropdownMenuItem key={item.label} className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-h8-regular">{t(item.label)}</span>
                  </DropdownMenuItem>
                </Link>
              </React.Fragment>
            );
          })}
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm pb-2.5 cursor-pointer gap-3" onClick={() => signOutAction()}>
          <LogOut className="w-5 h-5 text-primary" />
          <span className="text-h8-regular">{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
