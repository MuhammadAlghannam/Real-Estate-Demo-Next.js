import { Link } from "@/i18n/navigation";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";

export default function AppDowenload() {
  return (
    <>
      <h3 className="text-h4-semibold text-white pb-1">
        Download Hansy App Now!
      </h3>

      <p className="text-h7-regular text-white">
        Find everything you need for buying, selling property
        in our new Hansy App, Download Now!
      </p>

      <div className="flex gap-1.5 pt-3 items-center">
        <Link
          href="https://apps.apple.com/us/app/hansy/id6755159172"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/badges/apple-store.svg"
            alt="Download on the App Store"
            width={140}
            height={50}
            quality={75}
            className="w-[140px] h-[50px]"
          />
        </Link>

        <Link
          href="https://play.google.com/store/apps/details?id=com.mediacreation.hansyrealestat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/badges/google-play.svg"
            alt="Get it on Google Play"
            width={140}
            height={65}
            quality={50}
            className="w-[140px] h-[50px]"
          />
        </Link>

        {/* media */}
        <div className="flex items-center gap-3 ms-6">
          {/* facebook */}
          <Link href="https://www.facebook.com/hansyrealestate/" target="_blank">
            <div className="rounded-full p-2 border border-white w-fit">
              <Facebook className="w-5.5 h-5.5 text-white" fill="#fff" />
            </div>
          </Link>
          {/* insta */}
          <Link href="https://www.instagram.com/hansyrealestate" target="_blank">
            <div className="rounded-full p-2 border border-white w-fit">
              <Instagram className="w-5.5 h-5.5 text-white" />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
