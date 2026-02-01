import { auth } from "@/auth";
import CustomeBtn from "@/components/shared/CustomeBtn";
import { Link } from "@/i18n/navigation";
import getUserInfo from "@/lib/apis/profile/user-info.api";
import { navbarLinks } from "@/lib/constants/nav-links";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import HamburgerNav from "./_components/HamburgerNav";
import LanguageSwitcher from "./_components/LanguageSwitcher";
import NavLinks from "./_components/NavLinks";
import UserDropDown from "./_components/UserDropDown";
import VerifyAgentModel from "./_components/VerifyAgentModel";

export default async function NavBar() {
  const session = await auth();

  // Check for expired refresh token and redirect to logout
  if (session?.error === "RefreshTokenExpiredError") {
    redirect("/api/auth/logout");
  }

  // Get user info
  let initialUser: ApiUser | null = null;
  // Skip fetching user info if session has an error or no token
  if (session?.token && !session?.error) {
    try {
      initialUser = await getUserInfo();
    } catch {
      // If getUserInfo fails, just don't show user info
      initialUser = null;
    }
  }

  return (
    <header className="bg-white ">
      <div className="container-1440 border-b border-b-border py-6 ">
        <div className="flex-between items-center">

          {/* left */}
          <div>
            {/* Logo */}
            <Link href="/">
              <Image
                src={"/images/logos/nav-logo.svg"}
                alt={"Hansy logo"}
                width={1920}
                height={73}
                className="w-[97px] h-[73px]"
                priority
                quality={75}
              />
            </Link>
          </div>

          {/* middle */}
          <div>
            {/* Main Links */}
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-3">
                {navbarLinks
                  .filter((items) => {
                    const isHiddenStatic = ["Login", "Register", "Profile", "Hansy Circle"].includes(items.label);
                    const isFavoritesHiddenWhenLoggedOut = !session?.user && items.label === "Favorites";
                    return !isHiddenStatic && !isFavoritesHiddenWhenLoggedOut;
                  })
                  .map((items) => {
                    // Special handling for Verify Agent
                    if (items.label === "Verify Agent") {
                      return (
                        <li key={items.id}>
                          <VerifyAgentModel>
                            <button className="text-h6-regular border-b-2 border-transparent p-2.5 text-black hover:text-primary hover:border-b-2 hover:border-primary cursor-pointer">
                              {items.label}
                            </button>
                          </VerifyAgentModel>
                        </li>
                      );
                    }

                    return (
                      <NavLinks
                        key={items.id}
                        items={{ label: items.label, href: items.href }}
                      />
                    );
                  })}
              </ul>
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-4">
            {/* search */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/search" className="bg-secondary rounded-full p-3 cursor-pointer">
                <SearchIcon className="w-5 h-5 text-primary" />
              </Link>
            </div>
            {!session?.user &&
              <>
                <div className="hidden lg:flex items-center gap-3">
                  <CustomeBtn href="/login" className="bg-transparent! border border-primary text-primary!">Login</CustomeBtn>
                </div>
              </>}
            <div className="hidden lg:flex items-center gap-3">
              <CustomeBtn href="/hansy-circle">Hansy Circle</CustomeBtn>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {session?.user &&
              <>
                {/* User DropDown (desktop only) */}
                <div className="hidden lg:flex items-center gap-3">
                  {initialUser && <UserDropDown initialUser={initialUser} />}
                </div>
              </>
            }
          </div>

          {/* Hamburger Links */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/search" className="bg-secondary rounded-full p-3 cursor-pointer">
              <SearchIcon className="w-5 h-5 text-primary" />
            </Link>
            <HamburgerNav session={session} />
          </div>

        </div>
      </div>
    </header>
  )
}
