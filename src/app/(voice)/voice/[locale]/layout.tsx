import { sitePath } from "@/lib/site-path";
import { notFound } from "next/navigation";
import Document from "@/components/Document";
import SiteNav from "@/components/SiteNav";
import LanguageSwitch from "@/experiences/voice/LanguageSwitch";
import {
  isVoiceLocale,
  voiceCopy,
  voiceLocales,
  voicePath,
} from "@/content/voice";
import "@/experiences/voice/voice.css";
export const dynamicParams = false;
export function generateStaticParams() {
  return voiceLocales.map((locale) => ({ locale }));
}
export default async function VoiceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isVoiceLocale(locale)) notFound();
  const copy = voiceCopy[locale];
  const home = voicePath(locale);
  return (
    <Document className="voice-site" locale={locale}>
      <div className="voice-shell">
        <header className="voice-header">
          <a className="voice-wordmark" href={sitePath(home)}>
            {copy.brand}
            <span>{copy.role}</span>
          </a>
          <div className="voice-header-links">
            <SiteNav
              label={copy.brand}
              links={[
                { href: home + "#listen", label: copy.listen },
                { href: voicePath(locale, true), label: copy.about },
                { href: home + "#inquiries", label: copy.inquiries },
              ]}
            />
            <LanguageSwitch locale={locale} />
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="voice-footer">
          <span>
            {copy.brand} <span aria-hidden="true">—</span> {copy.footer}
          </span>
          <a href={sitePath("/")}>
            {copy.homeLink} <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </Document>
  );
}
