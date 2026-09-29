import Biography from "@/components/Biography";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About Clopes — Bloodbound Legacy",
  "Meet Clopes, the author of Bloodbound Legacy.",
  "/bloodbound-legacy/about/",
  "Bloodbound Legacy",
);
export default function About() {
  return (
    <>
      <header className="book-about-heading">
        <span className="book-kicker">The author</span>
        <h1>
          About <em>me.</em>
        </h1>
      </header>
      <Biography portrait="author" />
    </>
  );
}
