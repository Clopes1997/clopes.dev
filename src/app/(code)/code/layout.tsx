import { sitePath } from "@/lib/site-path";
import Document from "@/components/Document";
import SiteNav from "@/components/SiteNav";
import { profile } from "@/content/profile";
import "@/experiences/code/code.css";
export default function CodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Document className="code-site">
      <div className="code-shell">
        <header className="code-header">
          <a className="code-wordmark" href={sitePath("/code/")}>
            <span aria-hidden="true">c/</span> Clopes Code
          </a>
          <SiteNav
            label="Developer portfolio"
            links={[
              { href: "/code/", label: "Work" },
              { href: "/code/about/", label: "About me" },
              { href: "/code/#contact", label: "Contact" },
            ]}
          />
          <a className="code-github" href={profile.github}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="code-footer">
          <span>Clopes Code / Software development</span>
          <a href={sitePath("/")}>
            clopes.dev <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </Document>
  );
}
