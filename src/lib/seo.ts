import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { voiceCopy, voicePath } from "@/content/voice";
import type { Locale } from "@/content/biography";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  siteName = profile.brand,
): Metadata {
  const url = `${profile.siteUrl}${path}`;
  return {
    metadataBase: new URL(profile.siteUrl),
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary", title, description },
    icons: { icon: sitePath("/icon.svg") },
  };
}
export function voiceMetadata(locale: Locale, about = false): Metadata {
  const copy = voiceCopy[locale];
  const metadata = pageMetadata(
    about ? copy.aboutMeta : copy.metaTitle,
    copy.metaDescription,
    voicePath(locale, about),
    copy.brand,
  );
  return {
    ...metadata,
    alternates: {
      canonical: `${profile.siteUrl}${voicePath(locale, about)}`,
      languages: {
        "en-US": `${profile.siteUrl}${voicePath("en-US", about)}`,
        "pt-BR": `${profile.siteUrl}${voicePath("pt-BR", about)}`,
        "x-default": `${profile.siteUrl}${voicePath("en-US", about)}`,
      },
    },
    openGraph: {
      ...metadata.openGraph,
      locale: locale.replace("-", "_"),
      alternateLocale: [locale === "en-US" ? "pt_BR" : "en_US"],
    },
  };
}
