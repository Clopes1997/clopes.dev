/** Only published/supplied facts belong here; absent material stays absent in the UI. */
export const book: {
  title: string;
  status: string;
  description: string;
  cover: { src: string; alt: string } | null;
  synopsis: string | null;
  excerpts: { title: string; text: string }[];
  publication: string | null;
  purchaseLinks: { label: string; url: string }[];
  updates: { date: string; title: string; text: string }[];
} = {
  title: "Bloodbound Legacy",
  status: "Work in progress",
  description:
    "Bloodbound Legacy is my upcoming fiction book, still unpublished and very much a work in progress. More of it will find a home here when it’s ready to be shared.",
  cover: null,
  synopsis: null,
  excerpts: [],
  publication: null,
  purchaseLinks: [],
  updates: [],
};
