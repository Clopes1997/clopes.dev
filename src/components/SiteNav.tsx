"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function SiteNav({
  links,
  label,
}: {
  links: { href: string; label: string }[];
  label: string;
}) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  return (
    <nav aria-label={label}>
      {links.map((link) => (
        <Link
          prefetch={false}
          href={link.href}
          key={link.href}
          aria-current={
            !link.href.includes("#") &&
            pathname === (link.href.replace(/\/$/, "") || "/")
              ? "page"
              : undefined
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
