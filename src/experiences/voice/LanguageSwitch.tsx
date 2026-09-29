"use client";
import { sitePath } from "@/lib/site-path";
import { usePathname } from "next/navigation";
import { voiceCopy, voicePath } from "@/content/voice";
import type { Locale } from "@/content/biography";
export default function LanguageSwitch({ locale }: { locale: Locale }) {
  const about = usePathname().replace(/\/$/, "").endsWith("/about");
  return (
    <nav className="voice-language" aria-label={voiceCopy[locale].language}>
      <a
        href={sitePath(voicePath("en-US", about))}
        hrefLang="en-US"
        lang="en-US"
        aria-label="English (United States)"
        aria-current={locale === "en-US" ? "page" : undefined}
      >
        EN
      </a>
      <span aria-hidden="true">/</span>
      <a
        href={sitePath(voicePath("pt-BR", about))}
        hrefLang="pt-BR"
        lang="pt-BR"
        aria-label="Português (Brasil)"
        aria-current={locale === "pt-BR" ? "page" : undefined}
      >
        PT
      </a>
    </nav>
  );
}
