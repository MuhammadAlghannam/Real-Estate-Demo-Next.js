import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function LanguageSwitcher() {
  const locale = useLocale();

  return (
    <div>
      {locale === "en" ? (
        <Link href="/" locale="ar" className="flex items-center gap-2">
          <Image
            src="/images/global/ar-flag.svg"
            alt="Switch to Arabic"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span>AR</span>
        </Link>
      ) : (
        <Link href="/" locale="en" className="flex items-center gap-2">
          <Image
            src="/images/global/en-flag.svg"
            alt="Switch to English"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span>EN</span>
        </Link>
      )}
    </div>
  );
}
