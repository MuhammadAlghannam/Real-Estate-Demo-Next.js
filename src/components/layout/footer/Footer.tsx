import { footerNavigationLinks } from "@/lib/constants/footer-links";

import Image from "next/image";
import AppDowenload from "./_components/AppDowenload";
import { CopyRight } from "./_components/CopyRight";
import FooterLinks from "./_components/FooterLinks";


export default function Footer() {
  return (
    <footer className="bg-[url('/images/footer/footer-bg.png')] bg-no-repeat bg-cover py-12">
      <div className="container-1440 relative">
        <div className="flex flex-wrap sm:gap-8 md:gap-16 gap-6">
          {/* Logo + Description */}
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-[26.5%]">
            <Image
              src={"/images/logos/footer-logo-white.svg"}
              alt={"Hansy logo"}
              width={222}
              height={73}
              className="w-[222px] h-[73px]"
              priority
              quality={75}
            />

            <p className="text-h7-regular text-white pt-6">
              You deserve a team that understands the local market and puts your needs first. With our expertise, personalized service, and deep roots in the community, we make every real estate journey seamless and rewarding.
            </p>
          </div>

          {/* Links */}
          {footerNavigationLinks.map((items, index) => (
            <div key={index} className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/9">
              <FooterLinks items={items} />
            </div>
          ))}

          {/* App Links & Media */}
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
            <AppDowenload />
          </div>
        </div>
      </div>

      {/* Copyrights */}
      <div className="container-1440 border-t border-t-border pt-6 mt-6">
        <CopyRight />
      </div>
    </footer>
  )
}
