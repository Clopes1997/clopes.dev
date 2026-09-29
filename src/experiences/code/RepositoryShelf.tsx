"use client";

import { useState } from "react";
import type { Project } from "@/lib/github";

export default function RepositoryShelf({
  repositories,
  technologies,
  githubUrl,
  fetchedAt,
}: {
  repositories: Project[];
  technologies: string[];
  githubUrl: string;
  fetchedAt: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const visible = selected
    ? repositories.filter((repo) => repo.technologies.includes(selected))
    : repositories;
  return (
    <section
      className="code-library"
      id="repositories"
      aria-labelledby="repository-heading"
    >
      <div className="code-section-heading">
        <h2 id="repository-heading">
          The repository shelf<span> / 02</span>
        </h2>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          View on GitHub ↗
        </a>
      </div>
      <p className="code-library-intro">
        Browse the collection by technology. Select a technology again to clear
        the filter.
      </p>
      <div
        className="code-filters"
        role="group"
        aria-label="Filter repositories by technology"
      >
        {technologies.map((technology) => (
          <button
            key={technology}
            type="button"
            aria-pressed={selected === technology}
            aria-controls="repository-results"
            onClick={() =>
              setSelected((current) =>
                current === technology ? null : technology,
              )
            }
          >
            {technology}
          </button>
        ))}
      </div>
      <p className="code-result-count" role="status">
        {visible.length} {visible.length === 1 ? "repository" : "repositories"}
      </p>
      <div className="code-repo-list" id="repository-results">
        {visible.map((repo) => (
          <article className="code-repo" key={repo.id}>
            <a
              className="code-repo-name"
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.name}
            </a>
            <span>{repo.language ?? "Source"}</span>
            <div className="code-repo-actions">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${repo.displayName} source code`}
              >
                Source ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="code-library-intro">
          No repositories match this technology. Select it again to show the
          full collection.
        </p>
      )}
      <p className="code-provenance">
        GitHub snapshot:{" "}
        <time dateTime={fetchedAt}>
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          }).format(new Date(fetchedAt))}
        </time>
        . Pins and repository metadata refresh together.
      </p>
    </section>
  );
}
