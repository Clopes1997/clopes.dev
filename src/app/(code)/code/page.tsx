import RepositoryShelf from "@/experiences/code/RepositoryShelf";
import { pageMetadata } from "@/lib/seo";
import { profile } from "@/content/profile";
import { experience } from "@/content/code";
import {
  featuredProjects,
  github,
  publicRepositories,
  repositoryLanguages,
} from "@/lib/github";
export const metadata = pageMetadata(
  "Clopes Code — Software development",
  "Explore software projects by Clopes: interactive planning, inventory applications, and practical tools. Real repositories, source code, and implementation details from GitHub.",
  "/code/",
  "Clopes Code",
);
export default function CodePage() {
  return (
    <>
      <section className="code-intro">
        <div className="code-intro-label">
          <span className="code-label">Clopes / Software developer</span>
          <span className="code-small-cross" aria-hidden="true">
            +
          </span>
        </div>
        <h1>
          Practical software.
          <br />
          <span>Source included.</span>
        </h1>
        <div className="code-intro-bottom">
          <p>
            I build interfaces, applications, and tools.
            <br />
            Here’s the work, and the code behind it.
          </p>
          <a href="#projects">
            Explore selected work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section className="code-projects" id="projects">
        <div className="code-section-heading">
          <h2>
            Selected work<span> / 01</span>
          </h2>
        </div>
        <div className="code-project-grid">
          {featuredProjects.map((project, index) => (
            <article className="code-project" key={project.id}>
              <div className="code-project-top">
                <span className="code-project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {project.deploymentStatus === "Preview" && (
                  <span className="code-label">Preview</span>
                )}
              </div>
              <h3>
                {project.displayName.charAt(0).toUpperCase() +
                  project.displayName.slice(1)}
              </h3>
              <p>{project.description}</p>
              {project.technologies.length > 0 && (
                <ul className="code-tags" aria-label="Project technologies">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              )}
              {project.caveats && (
                <p className="code-project-caveat">{project.caveats}</p>
              )}
              <div className="code-project-links">
                {project.liveUrl && (
                  <a
                    className="code-live-link"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.displayName} live site (new tab)`}
                  >
                    Live site ↗
                  </a>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.displayName} source code (new tab)`}
                >
                  Source code ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <RepositoryShelf
        repositories={publicRepositories}
        technologies={repositoryLanguages}
        githubUrl={profile.github}
        fetchedAt={github.fetchedAt}
      />
      {experience.length > 0 && (
        <section className="code-experience">
          <h2>Professional experience</h2>
          {experience.map((entry) => (
            <article key={entry.organization + entry.period}>
              <h3>
                {entry.role} · {entry.organization}
              </h3>
              <p>{entry.period}</p>
              <p>{entry.description}</p>
              {entry.url && <a href={entry.url}>Learn more ↗</a>}
            </article>
          ))}
        </section>
      )}
      <section className="code-contact" id="contact">
        <div>
          <span className="code-label">Have something in mind?</span>
          <h2>Let’s build something useful.</h2>
        </div>
        <div>
          {profile.email && (
            <a href={`mailto:${profile.email}`}>
              {profile.email} <span aria-hidden="true">↗</span>
            </a>
          )}
          <a href={profile.github}>
            Find me on GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
