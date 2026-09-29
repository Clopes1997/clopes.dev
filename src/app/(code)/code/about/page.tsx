import Biography from "@/components/Biography";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About Clopes — Clopes Code",
  "About the developer behind Clopes Code.",
  "/code/about/",
  "Clopes Code",
);
export default function CodeAbout() {
  return (
    <>
      <header className="code-about-heading">
        <span className="code-label">The person behind the source</span>
        <h1>
          About me<span>_</span>
        </h1>
      </header>
      <Biography />
    </>
  );
}
