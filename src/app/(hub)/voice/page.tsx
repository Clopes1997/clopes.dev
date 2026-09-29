import ForwardPage from "@/components/ForwardPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata(
    "Clopes — Voice acting & narration",
    "Voice acting and narration by Clopes.",
    "/voice/en-US/",
  ),
  robots: { index: false, follow: true },
};
export default function VoiceEntry() {
  return <ForwardPage href="/voice/en-US/" label="Clopes / Voice" />;
}
