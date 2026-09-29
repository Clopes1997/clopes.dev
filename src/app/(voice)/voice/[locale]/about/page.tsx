import { notFound } from "next/navigation";
import Biography from "@/components/Biography";
import { biography } from "@/content/biography";
import { isVoiceLocale, voiceCopy } from "@/content/voice";
import { voiceMetadata } from "@/lib/seo";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isVoiceLocale(locale)) notFound();
  return voiceMetadata(locale, true);
}
export default async function VoiceAbout({ params }: Props) {
  const { locale } = await params;
  if (!isVoiceLocale(locale)) notFound();
  return (
    <>
      <header className="voice-about-heading">
        <span className="voice-label">{voiceCopy[locale].brand}</span>
        <h1>
          {biography[locale].heading}
          <span aria-hidden="true">.</span>
        </h1>
      </header>
      <Biography locale={locale} portrait="voice" />
    </>
  );
}
