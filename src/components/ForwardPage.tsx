import { sitePath } from "@/lib/site-path";
/** Static hosting has no redirect server. Immediate meta refresh also works without JS. */
export default function ForwardPage({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${sitePath(href)}`} />
      <section className="hub-about-title">
        <h1>{label}</h1>
        <p>
          <a href={sitePath(href)}>Continue →</a>
        </p>
      </section>
    </>
  );
}
