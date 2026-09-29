import { sitePath } from "@/lib/site-path";
import Document from "@/components/Document";
import SiteNav from "@/components/SiteNav";
import "@/experiences/book/book.css";
export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Document className="book-site">
      <div className="book-shell">
        <header className="book-header">
          <a href={sitePath("/bloodbound-legacy/")} className="book-wordmark">
            Bloodbound Legacy
          </a>
          <SiteNav
            label="Book navigation"
            links={[
              { href: "/bloodbound-legacy/", label: "The book" },
              { href: "/bloodbound-legacy/about/", label: "About me" },
            ]}
          />
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="book-footer">
          <span>
            Bloodbound Legacy <i aria-hidden="true">✦</i> A book by Clopes
          </span>
          <a href={sitePath("/")}>
            clopes.dev <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </Document>
  );
}
