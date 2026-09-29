import { notFound } from "next/navigation";
import { isVoiceLocale, voiceCopy, voiceMaterial } from "@/content/voice";
import { profile } from "@/content/profile";
import { voiceMetadata } from "@/lib/seo";
import VoiceSamples from "@/experiences/voice/VoiceSamples";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isVoiceLocale(locale)) notFound();
  return voiceMetadata(locale);
}
export default async function VoicePage({ params }: Props) {
  const { locale } = await params;
  if (!isVoiceLocale(locale)) notFound();
  const copy = voiceCopy[locale];
  return (
    <>
      <section className="voice-intro">
        <div>
          <span className="voice-label">{copy.role}</span>
          <h1>
            {copy.hero}
            <br />
            <em>{copy.heroEmphasis}</em>
          </h1>
        </div>
        <p>{copy.intro}</p>
      </section>
      <section className="voice-listening" id="listen">
        <div className="voice-section-heading">
          <h2>{copy.listenHeading}</h2>
          <span className="voice-label">{copy.sampleLabel}</span>
        </div>
        <VoiceSamples locale={locale} />
      </section>
      <section className="voice-training">
        <div>
          <span className="voice-label">{copy.trainingLabel}</span>
          <h2>{copy.trainingTitle}</h2>
        </div>
        <div>
          <p>{copy.training}</p>
          <p>{copy.auditions}</p>
        </div>
      </section>
      <section className="voice-practical">
        <h2>{copy.details}</h2>
        <dl>
          <div>
            <dt>{copy.languages}</dt>
            <dd>
              {voiceMaterial.languages.length
                ? voiceMaterial.languages
                    .map((language) => language[locale])
                    .join(" · ")
                : copy.languagesEmpty}
            </dd>
          </div>
          <div>
            <dt>{copy.setup}</dt>
            <dd>{voiceMaterial.setup?.[locale] || copy.setupEmpty}</dd>
          </div>
        </dl>
      </section>
      {voiceMaterial.credits.length > 0 && (
        <section className="voice-credits">
          <h2>{copy.credits}</h2>
          {voiceMaterial.credits.map((credit) => (
            <article key={credit.title}>
              <h3>
                {credit.url ? (
                  <a href={credit.url}>{credit.title}</a>
                ) : (
                  credit.title
                )}
              </h3>
              <p>
                {credit.role[locale]} · {credit.year}
              </p>
            </article>
          ))}
        </section>
      )}
      <section className="voice-contact" id="inquiries">
        <span className="voice-label">{copy.inquiries}</span>
        <div>
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactBody}</p>
          {profile.email ? (
            <a className="voice-contact-link" href={`mailto:${profile.email}`}>
              {copy.contactButton} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <p className="voice-contact-empty">{copy.contactEmpty}</p>
          )}
        </div>
      </section>
    </>
  );
}
