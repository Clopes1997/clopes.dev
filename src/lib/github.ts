import snapshot from "@/content/github.json";
import overrides from "@/content/code-projects.json";

interface Repository {
  id?: number;
  nodeId?: string;
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  fork: boolean;
  archived: boolean;
  private?: boolean;
  pinnedOrder?: number;
  pushedAt: string;
}
interface ProjectOverride {
  repositoryId?: number;
  fullName: string;
  displayName?: string;
  description?: string;
  liveUrl?: string | null;
  deploymentStatus?: string;
  caveats?: string;
  technologies?: string[];
}
function safeLiveUrl(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return null;
    if (
      ["github.com", "www.github.com", "api.github.com"].includes(
        url.hostname.toLowerCase(),
      )
    )
      return null;
    return url.href;
  } catch {
    return null;
  }
}
export const github = snapshot;
export const publicRepositories = (snapshot.repositories as Repository[])
  .filter(
    (repo) =>
      repo.id !== 1396298159 && // This portfolio must not list itself.
      repo.fullName.toLowerCase() !== "clopes1997/clopes.dev" &&
      !repo.private &&
      !repo.archived &&
      (!repo.fork || (repo.pinnedOrder ?? -1) >= 0),
  )
  .map((repo) => {
    const notes = (overrides as ProjectOverride[]).find((item) =>
      item.repositoryId != null
        ? item.repositoryId === repo.id
        : item.fullName.toLowerCase() === repo.fullName.toLowerCase(),
    );
    const liveUrl = safeLiveUrl(
      notes?.liveUrl === undefined ? repo.homepage : notes.liveUrl,
    );
    const pinnedOrder = repo.pinnedOrder ?? -1;
    return {
      ...repo,
      id: repo.id ?? repo.fullName.toLowerCase(),
      displayName: notes?.displayName ?? repo.name,
      description:
        notes?.description ??
        repo.description ??
        "Explore the source on GitHub.",
      technologies: [
        ...new Set(
          [repo.language, ...(notes?.technologies ?? [])].filter(
            (value): value is string => Boolean(value),
          ),
        ),
      ],
      liveUrl,
      deploymentStatus: liveUrl ? (notes?.deploymentStatus ?? "Live") : null,
      caveats: liveUrl ? (notes?.caveats ?? null) : null,
      pinned: pinnedOrder >= 0,
      pinnedOrder,
      featured: pinnedOrder >= 0 || Boolean(liveUrl),
    };
  })
  .sort((a, b) => a.fullName.localeCompare(b.fullName, "en"));
export type Project = (typeof publicRepositories)[number];
export const featuredProjects = publicRepositories
  .filter((repo) => repo.featured)
  .sort(
    (a, b) =>
      (a.pinned ? a.pinnedOrder : Number.MAX_SAFE_INTEGER) -
        (b.pinned ? b.pinnedOrder : Number.MAX_SAFE_INTEGER) ||
      a.fullName.localeCompare(b.fullName, "en"),
  );
export const repositoryLanguages = [
  ...new Set(publicRepositories.flatMap((repo) => repo.technologies)),
].sort();
export const githubDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
