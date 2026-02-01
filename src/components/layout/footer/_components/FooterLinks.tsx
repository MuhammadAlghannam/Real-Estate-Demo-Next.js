import { Link } from "@/i18n/navigation";

interface FooterLinksProps {
  items: {
    title: string;
    links: { label: string; href: string }[];
  };
}

export default function FooterLinks({ items }: FooterLinksProps) {
  return (
    <>
      {/* <h2 className="text-h7-semibold text-white pb-6">
        {items.title}
      </h2> */}
      <div className="flex flex-col gap-4 mt-3">
        {items.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-white text-h7-regular"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  )
}
