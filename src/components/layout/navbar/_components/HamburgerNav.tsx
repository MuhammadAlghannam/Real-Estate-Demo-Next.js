"use client";

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
import { LogOut, Menu } from "lucide-react";
import type { Session } from "next-auth"; // ← add type
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import VerifyAgentModel from "./VerifyAgentModel";

export default function HamburgerNav({ session }: { session: Session | null }) { // ← use prop
  // translations
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const router = useRouter();

  return (
    <>
      <DropdownMenu dir={isArabic ? "rtl" : "ltr"} onOpenChange={(open) => {
        if (open) router.refresh(); // 🔁 get a fresh server session snapshot on open
      }}>
        <DropdownMenuTrigger className="cursor-pointer">
          <Menu className="w-7 h-7 text-primary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn("p-1.5 rounded-lg  translate-y-[25px] w-[200px]", isArabic ? "translate-x-[20px]" : "translate-x-[-20px]")}>
          {navbarLinks
            .filter((item) => ["Home", "About Us", "Services", "Our Agents", "Verify Agent", "Contact Us", "Hansy Circle"].includes(item.label) || (item.label === "Favorites" && !!session?.user))
            .map((item) => (
              <React.Fragment key={item.label}>
                {item.label === "Verify Agent" ? (
                  <VerifyAgentModel>
                    <DropdownMenuItem
                      className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-h8-regular">{item.label}</span>
                    </DropdownMenuItem>
                  </VerifyAgentModel>
                ) : (
                  <Link href={item.href}>
                    <DropdownMenuItem
                      className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-h8-regular">{item.label}</span>
                    </DropdownMenuItem>
                  </Link>
                )}
              </React.Fragment>
            ))}
          <DropdownMenuSeparator className="my-2" />
          {session?.user ? (
            <>
              {navbarLinks
                .filter((item) => item.label === "Profile")
                .map((item) => (
                  <React.Fragment key={item.label}>
                    <Link href={item.href}>
                      <DropdownMenuItem
                        className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer"
                      >
                        <item.icon className="w-5 h-5 text-primary" />
                        <span className="text-h8-regular">{t(item.label)}</span>
                      </DropdownMenuItem>
                    </Link>
                  </React.Fragment>
                ))}
              <DropdownMenuItem
                className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm pb-2.5 cursor-pointer gap-3"
                onClick={async () => await signOutAction()}
              >
                <LogOut className="w-5 h-5 text-primary" />
                <span className="text-h8-regular">{t("logout")}</span>
              </DropdownMenuItem>
            </>
          ) : (
            navbarLinks
              .filter((item) => ["Login", "Register"].includes(item.label))
              .map((item) => (
                <DropdownMenuItem
                  asChild
                  key={item.label}
                  className="hover:!bg-[#F7F7F7] hover:!text-black bg-transparent rounded-sm p-2.5 cursor-pointer"
                >
                  {item.label === "Login" ? (
                    // store current URL before navigating to /login
                    <Link
                      href={item.href}
                      className="flex items-center gap-3"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-h8-regular">{item.label}</span>
                    </Link>
                  ) : (
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-h8-regular">{item.label}</span>
                    </Link>
                  )}
                </DropdownMenuItem>
              ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}