import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";
import Document from "@/components/Document";
import "@/experiences/hub/hub.css";
export const metadata: Metadata = {
  title: "Page not found · clopes.dev",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <Document className="hub-site">
      <main id="main" tabIndex={-1} className="hub-shell">
        <div className="hub-about-title">
          <span className="hub-eyebrow">404 / A loose thread</span>
          <h1>
            Nothing <em>here.</em>
          </h1>
          <p>This page doesn’t exist. Let’s get you back to familiar ground.</p>
          <p>
            <a href={sitePath("/")}>Back to clopes.dev →</a>
          </p>
        </div>
      </main>
    </Document>
  );
}
