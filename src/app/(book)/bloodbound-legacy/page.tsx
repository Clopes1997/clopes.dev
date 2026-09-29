import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { book } from "@/content/book";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Bloodbound Legacy — An upcoming book by Clopes",
  "The official home of Bloodbound Legacy, an unpublished fiction book by Clopes. A work in progress.",
  "/bloodbound-legacy/",
  "Bloodbound Legacy",
);
export default function Book() {
  return (
    <>
      <section className="book-opening">
        <span className="book-kicker">An upcoming fiction book by Clopes</span>
        <div className="book-ornament" aria-hidden="true">
          <span />✦<span />
        </div>
        <h1>
          Bloodbound
          <br />
          <em>Legacy</em>
        </h1>
        <p className="book-status">{book.status}</p>
        <a
          className="book-scroll"
          href="#manuscript"
          aria-label="Read about the manuscript"
        >
          ↓
        </a>
      </section>
      <section className="book-manuscript" id="manuscript">
        <span className="book-section-label">A note on the manuscript</span>
        <div>
          <h2>
            Still being written.
            <br />
            <em>Not yet on your shelf.</em>
          </h2>
          <p>{book.description}</p>
          <p className="book-promise">
            This is its home while the pages come together.
          </p>
        </div>
      </section>
      {book.cover && (
        <figure className="book-cover">
          <Image
            src={sitePath(book.cover.src)}
            alt={book.cover.alt}
            width={640}
            height={960}
            sizes="(max-width: 700px) 90vw, 420px"
          />
        </figure>
      )}
      {book.synopsis && (
        <section className="book-reading">
          <h2>The story</h2>
          <p>{book.synopsis}</p>
        </section>
      )}
      {book.excerpts.map((excerpt) => (
        <section className="book-reading" key={excerpt.title}>
          <span className="book-section-label">An excerpt</span>
          <h2>{excerpt.title}</h2>
          <div className="book-excerpt">{excerpt.text}</div>
        </section>
      ))}
      {book.publication && (
        <section className="book-reading">
          <h2>Publication</h2>
          <p>{book.publication}</p>
        </section>
      )}
      {book.purchaseLinks.length > 0 && (
        <nav className="book-reading" aria-label="Get the book">
          {book.purchaseLinks.map((link) => (
            <a key={link.url} href={link.url}>
              {link.label} ↗
            </a>
          ))}
        </nav>
      )}
      {book.updates.length > 0 && (
        <section className="book-reading">
          <h2>From the writing desk</h2>
          {book.updates.map((update) => (
            <article key={update.date + update.title}>
              <time dateTime={update.date}>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "long",
                  timeZone: "UTC",
                }).format(new Date(update.date))}
              </time>
              <h3>{update.title}</h3>
              <p>{update.text}</p>
            </article>
          ))}
        </section>
      )}
      <aside className="book-author">
        <span className="book-section-label">Behind the pages</span>
        <h2>
          Written by <em>Clopes.</em>
        </h2>
        <a href={sitePath("/bloodbound-legacy/about/")}>
          Meet the author <span aria-hidden="true">→</span>
        </a>
      </aside>
    </>
  );
}
