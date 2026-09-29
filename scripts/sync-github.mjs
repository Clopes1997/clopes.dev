import { readFile, writeFile, rename } from "node:fs/promises";

const snapshotPath = new URL("../src/content/github.json", import.meta.url);
const username = "Clopes1997";
const endpoint = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "clopes.dev-portfolio",
  "X-GitHub-Api-Version": "2022-11-28",
};
async function request(url, json = true) {
  const response = await fetch(url, {
    headers: json ? headers : { "User-Agent": headers["User-Agent"] },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new Error(`GitHub returned ${response.status} for ${url}`);
  return json ? response.json() : response.text();
}
function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
async function pinnedRepositories() {
  // REST does not expose profile pins. Read only explicitly marked PINNED_REPO
  // anchors from the public profile, in display order, including GitHub database IDs.
  const html = await request(`https://github.com/${username}`, false);
  const pins = [
    ...html.matchAll(
      /<a\b[^>]*data-hydro-click="[^"]*PINNED_REPO[^"]*"[^>]*>/g,
    ),
  ].map(([anchor]) => {
    const id = anchor.match(/\bid="(\d+)"/)?.[1];
    const fullName = anchor.match(/\bhref="\/([^"/]+\/[^"/]+)"/)?.[1];
    if (!id || !fullName)
      throw new Error("GitHub pin markup changed; retaining previous snapshot");
    return { id: Number(id), fullName };
  });
  if (!pins.length && !/Popular repositories/.test(html))
    throw new Error(
      "Could not verify profile pins; retaining previous snapshot",
    );
  return [...new Map(pins.map((pin) => [pin.id, pin])).values()];
}
try {
  let repositories = [];
  let evidence;
  const importAt = process.argv.indexOf("--from-evidence");
  if (importAt !== -1) {
    evidence = JSON.parse(await readFile(process.argv[importAt + 1], "utf8"));
    repositories = evidence.repositories;
    if (!Array.isArray(evidence.pinnedRepositories))
      throw new Error("Evidence must include ordered pinnedRepositories");
  } else {
    for (let page = 1; page <= 10; page++) {
      const batch = await request(`${endpoint}&page=${page}`);
      if (!Array.isArray(batch)) throw new Error("Invalid repository response");
      repositories.push(...batch);
      if (batch.length < 100) break;
      if (page === 10) throw new Error("Repository pagination limit reached");
    }
  }
  const pins = evidence?.pinnedRepositories ?? (await pinnedRepositories());
  // Include public pinned repositories owned elsewhere as well.
  for (const pin of pins) {
    if (!repositories.some((repo) => repo.id === pin.id)) {
      if (evidence)
        throw new Error(`Missing pinned repository evidence: ${pin.fullName}`);
      repositories.push(
        await request(`https://api.github.com/repos/${pin.fullName}`),
      );
    }
  }
  repositories = [
    ...new Map(
      repositories
        .filter((repo) => !repo.private)
        .map((repo) => [repo.id, repo]),
    ).values(),
  ];
  if (!repositories.length) throw new Error("No public repositories returned");
  const snapshot = {
    username,
    fetchedAt: evidence?.fetchedAt ?? new Date().toISOString(),
    source: endpoint,
    pinnedSource: `https://github.com/${username}`,
    pinnedRepositoryIds: pins.map((pin) => pin.id),
    repositories: repositories.map((repo) => ({
      id: repo.id,
      nodeId: repo.node_id,
      name: repo.name,
      fullName: repo.full_name,
      url: repo.html_url,
      description: repo.description,
      homepage: safeUrl(repo.homepage),
      language: repo.language,
      topics: repo.topics ?? [],
      stars: repo.stargazers_count,
      fork: repo.fork,
      archived: repo.archived,
      private: repo.private,
      pinnedOrder: pins.findIndex((pin) => pin.id === repo.id),
      pushedAt: repo.pushed_at,
      updatedAt: repo.updated_at,
      defaultBranch: repo.default_branch,
    })),
  };
  const temporaryPath = new URL("./github.json.tmp", snapshotPath);
  await writeFile(temporaryPath, JSON.stringify(snapshot, null, 2) + "\n");
  await rename(temporaryPath, snapshotPath);
  console.log(
    `GitHub: saved ${repositories.length} repositories and ${pins.length} ordered pins (${snapshot.fetchedAt}).`,
  );
} catch (error) {
  const cached = await readFile(snapshotPath, "utf8")
    .then(JSON.parse)
    .catch(() => null);
  if (process.argv.includes("--strict") || !cached?.repositories?.length)
    throw error;
  console.warn(
    `GitHub refresh unavailable: ${error.message}. Using the complete saved snapshot from ${cached.fetchedAt}.`,
  );
}
