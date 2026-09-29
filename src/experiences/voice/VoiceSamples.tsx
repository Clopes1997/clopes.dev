"use client";
import { sitePath } from "@/lib/site-path";
import { useRef } from "react";
import { voiceCopy, voiceMaterial } from "@/content/voice";
import type { Locale } from "@/content/biography";
/** Native accessible playback, one sample at a time; nothing fabricated for empty data. */
export default function VoiceSamples({ locale }: { locale: Locale }) {
  const active = useRef<HTMLAudioElement | null>(null);
  const copy = voiceCopy[locale];
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
