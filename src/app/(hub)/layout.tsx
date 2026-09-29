import { sitePath } from "@/lib/site-path";
import Document from "@/components/Document";
import SiteNav from "@/components/SiteNav";
import "@/experiences/hub/hub.css";
export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <Document className="hub-site">
      <div className="hub-shell">
        <header className="hub-header">
          <a className="hub-wordmark" href={sitePath("/")}>
            clopes<span>.dev</span>
            <span className="hub-mark" aria-hidden="true">
              ✳
            </span>
          </a>
          <SiteNav
            label="Personal hub"
            links={[
              { href: "/", label: "Home" },
              { href: "/about/", label: "About me" },
            ]}
          />
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </Document>
  );
}
