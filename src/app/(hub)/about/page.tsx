import { sitePath } from "@/lib/site-path";
import Biography from "@/components/Biography";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About Clopes · Clopes Code",
  "The person behind the code, the book, and the voice.",
  "/about/",
);
export default function About() {
  return (
    <>
      <header className="hub-about-title">
        <span className="hub-eyebrow">The person behind it all</span>
        <h1>
          About <em>me.</em>
        </h1>
      </header>
      <Biography portrait="photo" />
      <footer className="hub-footer">
        <a href={sitePath("/")}>
          Back to clopes.dev <span aria-hidden="true">↗</span>
        </a>
        <span>Clopes Code</span>
      </footer>
    </>
  );
}
