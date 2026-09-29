import { sitePath } from "@/lib/site-path";
import { pageMetadata } from "@/lib/seo";
import SmallDetail from "@/experiences/hub/SmallDetail";
export const metadata = pageMetadata(
  "Clopes Code — A personal home on the internet",
  "I make things. With code, words, stories, and my voice. Explore the work of Clopes.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="hub-hero">
        <div className="hub-eyebrow">
          <span className="hub-dot" /> Clopes Code / A personal home on the
          internet
        </div>
        <h1>
          I make <em>things.</em>
        </h1>
        <div className="hub-hero-bottom">
          <p>
            With code, words, stories,
            <br />
            and my voice.
          </p>
          <span className="hub-margin-note">
            Different ways of making.
            <br />
            The same curious person.
          </span>
        </div>
        <a className="hub-explore" href="#explore">
          Find a thread <span aria-hidden="true">↓</span>
        </a>
      </section>
      <section id="explore" className="hub-paths" aria-label="Explore my work">
        <a href={sitePath("/bloodbound-legacy/")} className="hub-path hub-book">
          <div className="hub-path-top">
            <span>01 / The book</span>
            <span aria-hidden="true">↗</span>
          </div>
          <h2>
            Bloodbound
            <br />
            <em>Legacy</em>
          </h2>
          <div className="hub-path-bottom">
            <p>
              A fiction book.
              <br />
              Still in the making.
            </p>
            <span>
              Enter the book’s world <span aria-hidden="true">→</span>
            </span>
          </div>
        </a>
        <a href={sitePath("/code/")} className="hub-path hub-code">
          <div className="hub-path-top">
            <span>02 / The code</span>
            <span aria-hidden="true">↗</span>
          </div>
          <h2>
            Ideas,
            <br />
            <span>implemented.</span>
          </h2>
          <div className="hub-path-bottom">
            <p>
              Software, experiments,
              <br />
              and the source behind them.
            </p>
            <span>
              Explore my work <span aria-hidden="true">→</span>
            </span>
          </div>
        </a>
        <a href={sitePath("/voice/en-US/")} className="hub-path hub-voice">
          <div className="hub-path-top">
            <span>03 / The voice</span>
            <span aria-hidden="true">↗</span>
          </div>
          <h2>
            Words,
            <br />
            <em>given voice.</em>
          </h2>
          <div className="hub-path-bottom">
            <p>
              Narration and voice acting.
              <br />A voice in progress.
            </p>
            <span>
              Meet the voice <span aria-hidden="true">→</span>
            </span>
          </div>
        </a>
      </section>
      <section className="hub-note">
        <span className="hub-eyebrow">The person between the projects</span>
        <p>
          Some days, a keyboard.
          <br />
          Some days, a microphone.
          <br />
          <em>Always making something.</em>
        </p>
        <a href={sitePath("/about/")}>
          A little about me <span aria-hidden="true">↗</span>
        </a>
      </section>
      <footer className="hub-footer">
        <span>
          Clopes Code <span aria-hidden="true">/</span> One person. A few
          different worlds.
        </span>
        <SmallDetail />
        <span>Made with curiosity.</span>
      </footer>
    </>
  );
}
