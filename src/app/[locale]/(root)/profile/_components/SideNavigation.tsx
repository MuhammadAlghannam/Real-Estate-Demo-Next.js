"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { profileSidebarLinks } from "@/lib/constants/profileSidebar";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import DeleteAccountBtn from "./DeleteAccountBtn";

export default function SideNavigation() {
  const pathname = usePathname();
  const t = useTranslations("ProfileSidebar");

  return (
    <nav>
      {/* flex-row + x-scroll on mobile, flex-col on md+ */}
      <ul className="flex md:flex-col flex-row gap-4 h-full overflow-x-auto md:overflow-visible whitespace-nowrap scrollbar-hidden">
        {(() => {
          const isActive = (href: string) => {
            if (!href) return false;
            if (href === "/profile") return pathname === "/profile";
            return pathname === href || pathname.startsWith(href + "/");
          };

          return profileSidebarLinks.map((link) => (
            // prevent items from shrinking in the horizontal scroller
            <li key={link.id} className="shrink-0">
              {link.type === "action" ? (
                <DeleteAccountBtn
                  className={cn(
                    "py-4 px-6 rounded-[40px] text-h7-semibold hover:bg-primary transition-colors flex items-center gap-4 font-semibold text-black hover:text-white w-full text-left cursor-pointer"
                  )}
                >
                  <link.icon className={cn("w-5 h-5 hover:text-white transition-colors")} />
                  <span>{t(link.label)}</span>
                </DeleteAccountBtn>
              ) : (
                <Link
                  className={cn(
                    "py-4 px-6 rounded-[40px] text-h7-semibold hover:bg-primary transition-colors flex items-center gap-4 font-semibold text-black hover:text-white",
                    isActive(link.href) ? "bg-primary text-white" : ""
                  )}
                  href={link.href}
                >
                  <link.icon
                    className={cn(
                      "w-5 h-5 hover:text-white transition-colors",
                      isActive(link.href) ? "text-white" : ""
                    )}
                  />
                  <span>{t(link.label)}</span>
                </Link>
              )}
            </li>
          ));
        })()}
      </ul>
    </nav>
  );
}
