import "@fontsource-variable/dm-sans";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@/app/globals.css";
import type { Locale } from "@/content/biography";

/** Shared document mechanics only. Each experience owns its shell and styles. */
export default function Document({
  children,
  locale = "en-US",
  className,
}: {
  children: React.ReactNode;
  locale?: Locale;
  className: string;
}) {
  return (
    <html lang={locale}>
      <body className={className}>
        <a className="skip-link" href="#main">
          {locale === "pt-BR" ? "Pular para o conteúdo" : "Skip to content"}
        </a>
        {children}
      </body>
    </html>
  );
}
