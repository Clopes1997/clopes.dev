"use client";
import { sitePath } from "@/lib/site-path";
import { useRef } from "react";
import { voiceCopy, voiceMaterial } from "@/content/voice";
import type { Locale } from "@/content/biography";

const brazilianVideoSamples = [
  { title: "Mulan", driveId: "1BiaxDO60JhaRTmpYUq1ajB5nw3CIJRAF" },
  {
    title: "The Social Network",
    driveId: "17WiVmPAhZOxw8bMb6rRpu-EYMQcwRtrP",
  },
  {
    title: "Gato de Botas 2",
    driveId: "1EDglGlJkU0aAC_zTURU9gSkDiaX9YOJd",
  },
];
const brazilianDemoReel = "/audio/voice-demo-reel-pt-br.wav";

function BrazilianVoicePortfolio({ audioFallback }: { audioFallback: string }) {
  return (
    <div className="voice-portfolio">
      <div className="voice-portfolio-heading">
        <h3>Trabalhos de dublagem</h3>
        <p>Trechos de personagens em português brasileiro.</p>
      </div>
      <div className="voice-video-grid">
        {brazilianVideoSamples.map((sample, index) => (
          <article className="voice-work-sample" key={sample.driveId}>
            <div className="voice-work-meta">
              <span>
                {String(index + 1).padStart(2, "0")}/ {sample.title}
              </span>
            </div>
            <div className="voice-video-frame">
              <iframe
                src={`https://drive.google.com/file/d/${sample.driveId}/preview`}
                title={`Trecho de dublagem de ${sample.title}`}
                loading="lazy"
                allow="autoplay"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </article>
        ))}
      </div>
      <article className="voice-demo-reel">
        <div>
          <span className="voice-label">Demonstração em áudio</span>
          <h3 id="pt-br-demo-reel-title">Demo reel — português brasileiro</h3>
          <p>Uma seleção de vozes e interpretações em português brasileiro.</p>
        </div>
        <div className="voice-demo-reel-player">
          <audio
            controls
            preload="none"
            aria-labelledby="pt-br-demo-reel-title"
          >
            <source src={sitePath(brazilianDemoReel)} type="audio/wav" />
            {audioFallback}
          </audio>
        </div>
      </article>
    </div>
  );
}

/** Native accessible playback, one sample at a time; nothing fabricated for empty data. */
export default function VoiceSamples({ locale }: { locale: Locale }) {
  const active = useRef<HTMLAudioElement | null>(null);
  const copy = voiceCopy[locale];
  if (locale === "pt-BR")
    return <BrazilianVoicePortfolio audioFallback={copy.audioFallback} />;
  if (!voiceMaterial.samples.length)
    return (
      <div className="voice-empty">
        <span className="voice-empty-symbol" aria-hidden="true">
          “
        </span>
        <div>
          <h3>{copy.emptyTitle}</h3>
          <p>{copy.emptyDescription}</p>
          <div className="voice-empty-formats">
            <span>{copy.narration}</span>
            <span>{copy.character}</span>
            <small>{copy.preparing}</small>
          </div>
        </div>
      </div>
    );
  return (
    <div className="voice-samples">
      {voiceMaterial.samples.map((sample, index) => (
        <article className="voice-sample" key={sample.id}>
          <div className="voice-sample-meta">
            <span>
              {String(index + 1).padStart(2, "0")} / {copy[sample.category]}
            </span>
            <span>
              {sample.spokenLanguage[locale]} · {sample.duration}
            </span>
          </div>
          <h3 id={`sample-${sample.id}`}>{sample.title[locale]}</h3>
          <p>{sample.context[locale]}</p>
          <audio
            controls
            preload="none"
            aria-labelledby={`sample-${sample.id}`}
            onPlay={(event) => {
              if (active.current && active.current !== event.currentTarget)
                active.current.pause();
              active.current = event.currentTarget;
            }}
          >
            <source src={sitePath(sample.src)} type={sample.mimeType} />
            {copy.audioFallback}
          </audio>
          <div className="voice-sample-links">
            <details>
              <summary>{copy.transcript}</summary>
              <p>{sample.transcript[locale]}</p>
            </details>
            <a href={sitePath(sample.src)} download>
              {copy.download} ↓
            </a>
          </div>
          {sample.credit && (
            <p className="voice-sample-credit">{sample.credit[locale]}</p>
          )}
        </article>
      ))}
    </div>
  );
}
