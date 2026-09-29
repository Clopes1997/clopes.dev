import { music } from "./music";
export default function YouTubeEmbed() {
  return (
    <figure className="video-figure">
      <div className="video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${music.youtubeId}?hl=en`}
          title={music.title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <figcaption>
        <span>{music.title}</span>
        <a href={music.url} target="_blank" rel="noreferrer">
          Watch on YouTube <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
