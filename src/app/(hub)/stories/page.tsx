import ForwardPage from "@/components/ForwardPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata(
    "Bloodbound Legacy",
    "The book has a home of its own.",
    "/bloodbound-legacy/",
  ),
  robots: { index: false, follow: true },
};
export default function Stories() {
  return <ForwardPage href="/bloodbound-legacy/" label="Bloodbound Legacy" />;
}
