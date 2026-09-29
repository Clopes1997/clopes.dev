import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { biography, type Locale } from "@/content/biography";
import { profile } from "@/content/profile";

/** Shared portrait and biography component. Used exclusively on About routes. */
export default function Biography({
  locale = "en-US",
  portrait = "original",
}: {
  locale?: Locale;
  portrait?: "original" | "voice" | "author" | "photo";
}) {
  const content = biography[locale];
  const portraits = {
    original: { src: profile.avatar, alt: content.avatarAlt },
    photo: {
      src: "/images/clopes-photo.webp",
      alt:
        locale === "pt-BR"
          ? "Foto de Clopes sentado em um banco em frente a uma loja com lanternas japonesas"
          : "Photo of Clopes seated outside a shop with Japanese lanterns",
    },
    voice: {
      src: "/images/clopes-voice-avatar.png",
      alt:
        locale === "pt-BR"
          ? "Retrato ilustrado de Clopes com fones e microfone em um estúdio em tons quentes"
          : "Illustrated portrait of Clopes with headphones and microphone in a warm recording studio",
    },
    author: {
      src: "/images/clopes-author-avatar.png",
      alt:
        locale === "pt-BR"
          ? "Retrato ilustrado de Clopes com um livro em um escritório em tons de vinho"
          : "Illustrated portrait of Clopes holding a book in a burgundy study",
    },
  };
  const avatar = portraits[portrait];
  return (
    <div className="biography">
      <figure className="bio-portrait">
        <Image
          src={sitePath(avatar.src)}
          alt={avatar.alt}
          width={portrait === "photo" ? 802 : 800}
          height={portrait === "photo" ? 1200 : 800}
          sizes="(max-width: 700px) 85vw, 360px"
          priority
        />
        <figcaption>{content.name}</figcaption>
      </figure>
      <div className="bio-copy" data-biography={locale}>
        <p className="bio-introduction">{content.introduction}</p>
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
