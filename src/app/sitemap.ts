import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { voiceLocales, voicePath } from "@/content/voice";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...[
      "/",
      "/about/",
      "/bloodbound-legacy/",
      "/bloodbound-legacy/about/",
      "/code/",
      "/code/about/",
    ].map((path) => ({ url: `${profile.siteUrl}${path}` })),
    ...voiceLocales.flatMap((locale) =>
      [false, true].map((about) => ({
        url: `${profile.siteUrl}${voicePath(locale, about)}`,
        alternates: {
          languages: {
            "en-US": `${profile.siteUrl}${voicePath("en-US", about)}`,
            "pt-BR": `${profile.siteUrl}${voicePath("pt-BR", about)}`,
          },
        },
      })),
    ),
  ];
}
