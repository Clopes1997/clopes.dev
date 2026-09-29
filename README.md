# clopes.dev — one person, four experiences

Clopes Code is the personal hub at `clopes.dev`. The book, development portfolio, and voice portfolio have separate root layouts, navigation, typography, page structure, and styles. No separate music site exists.

## Stack and architecture

Next.js 16 App Router, React 19, strict TypeScript, and static HTML export. Locally served DM Sans, Newsreader, and IBM Plex Mono keep builds independent of font services. There is no database, CMS, or production API server. GitHub is queried at build time, never on a visitor's critical path.

The route groups have independent root layouts, so moving between experiences makes a document navigation. Each experience receives only its own UI and interaction code. The shared `Document` component supplies fonts, resets, the skip link, and the correct document language. `globalNotFound` is enabled for a custom 404 across multiple root layouts. Internal Next navigation disables speculative prefetch because the Windows static exporter generates segment filenames that do not match prefetch requests.

## Run locally

Use Node **22.13 or newer**. Dependencies are locked in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. To verify and serve the production output:

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

`build` first refreshes public GitHub metadata, then exports static pages to `out/`. `start` serves that directory on port 3000. Stop development before starting production on the same port. Nothing is deployed automatically.

```sh
npx playwright install chromium
npm run test:e2e
npm run format:check
```

The browser suite checks every canonical page at desktop and mobile sizes, accessibility, links, metadata, shared biographies, avatar placement, language switching, redirects, and isolation of the root-only interaction. It also checks 320px layouts and 200% text enlargement. Screenshots are saved under `test-results/`.

## Routes and files

| Experience | Landing | About |
| --- | --- | --- |
| Personal hub | `/` | `/about/` |
| Bloodbound Legacy | `/bloodbound-legacy/` | `/bloodbound-legacy/about/` |
| Clopes Code | `/code/` | `/code/about/` |
| Voice in English | `/voice/en-US/` | `/voice/en-US/about/` |
| Voz em português brasileiro | `/voice/pt-BR/` | `/voice/pt-BR/about/` |

`/voice/` forwards immediately to the English portfolio. `/stories/` forwards to the book. These static-compatible forwarding pages include canonical metadata, noindex, a fallback link, and an immediate meta refresh that also works without JavaScript. On a production host, optional HTTP 308 redirects can replace these two forwarding pages. All canonical URLs use trailing slashes. There is no `/music/` or generic stories portfolio.

```text
src/app/(hub)/                Personal hub, About, legacy forwarding pages
src/app/(book)/               Book root layout, landing, About
src/app/(code)/               Developer root layout, landing, About
src/app/(voice)/voice/[locale] Localized voice root layout, landing, About
src/app/globals.css           Reset, fonts variables, accessibility primitives
src/app/global-not-found.tsx  Shared 404, without hidden functionality
src/app/sitemap.ts            Canonical pages and voice language alternates
src/components/              Document, biography, navigation, forwarding utility
src/experiences/              Separate hub/book/code/voice designs and interactions
src/content/                  Editable facts, translations, curation, GitHub snapshot
src/lib/                      SEO and GitHub presentation helpers
scripts/sync-github.mjs        Public API snapshot refresh
public/images/                Original avatar and shared optimized WebP
```

## Content editing

- **Identity and contact:** `src/content/profile.ts`. The supplied email is `clopescode97@gmail.com`. The avatar is only rendered by `Biography.tsx` on About pages. The shared Biography component chooses the real photo for the hub, the original avatar for code, the voice portrait for both voice locales, and the author portrait for the book About page.
- **Biography:** `src/content/biography.ts` is the only source of truth. Update the English and Brazilian Portuguese entries together. Every About page renders this exact content, while each experience controls its presentation.
- **Book:** `src/content/book.ts`. Add a supplied cover, synopsis, excerpts, actual publication details, purchase links, or updates there. Empty fields render nothing. The current site only claims an unpublished fiction work in progress; it contains no invented synopsis, genre, dates, reviews, or artwork.
- **Voice:** `src/content/voice.ts`. `voiceCopy` contains the typed locale dictionaries; `voiceMaterial` contains the shared portfolio records. A translation missing a UI key causes a TypeScript error. UI language never implies performance language or accent proficiency.
- **Code:** `src/content/code-projects.json` contains optional editorial/deployment overrides, matched by stable GitHub repository ID (or case-insensitive owner/name for new entries). It does not select featured projects. `src/content/code.ts` holds optional professional experience. `src/content/github.json` is the generated repository/pin snapshot; `src/lib/github.ts` derives the shared project model.

There are currently no supplied public voice recordings, professional voice credits, recording setup, book cover, or excerpts. Empty states are deliberate. DMing stays a brief biographical side note.

### Adding voice material

Put an approved audio file in `public/audio/` and add one record to `voiceMaterial.samples` with a stable ID, localized title/context, category (`narration`, `character`, or `commercial`), source path, MIME type, actual duration, spoken language, and localized transcript. Add real credit information only when applicable. For example, a source stored at `public/audio/example.mp3` is referenced as `/audio/example.mp3`.

The native audio players load on demand, pause the previous sample when another starts, provide download links, and expose expandable transcripts. Do not publish empty or fake audio records. Reels and individual excerpts use the same model. Both locale pages render the same samples with translated context.

### GitHub refresh

```sh
npm run sync:github
```

This strict command refreshes repository metadata and ordered GitHub profile pins together, or exits with an error. Both `npm run dev` and `npm run build` refresh automatically. A failed automatic refresh retains the complete last successful snapshot and prints its date; it never overwrites pins with a partial result. No GitHub token is required or sent to visitors.

The public REST repository endpoint does not expose pins. The sync reads explicitly marked `PINNED_REPO` links from the public profile, preserves their displayed order, and joins their numeric GitHub database IDs to REST metadata. If GitHub changes that markup, the refresh fails visibly and preserves the snapshot. An evidence import must include ordered `pinnedRepositories` entries with `id` and `fullName`.

Selected Work is the union of eligible pinned repositories and repositories with a valid live URL. Pins come first in profile order, followed by other deployed repositories sorted by full name. Stable IDs prevent duplicates and survive renames. Private/archived repositories and unpinned forks are excluded. Editorial overrides never pin a repository.

Deployment resolution: an explicit `liveUrl` override takes precedence over GitHub `homepage`; `null` deliberately suppresses a deployment. Only valid HTTP(S) URLs without credentials are accepted, and GitHub source URLs are excluded. Pages/Vercel URLs are not guessed from repository names or topics. Segura uses its existing GitHub homepage without a deployment override. Add an override in `src/content/code-projects.json` when GitHub has no homepage or points elsewhere. Prefer `repositoryId`; `fullName` is a case-insensitive fallback only when no ID is configured. Optional description, display name, technologies, deployment status, and caveats decorate the same record.

The shelf and Selected Work derive from that single normalized collection. Technology filters use the primary repository language plus explicit editorial technologies. One filter may be active; clicking it again clears it immediately. There is no All control or persisted browser filter state.

After changing GitHub pins, run `npm run sync:github` in an active dev session (or restart `npm run dev`). The JSON import updates the page through Next's normal rebuild. Production is a static export: run `npm run build` and publish the new `out/` output. A running `npm run start` serves the last export, not changed source files. There is no browser-local pinned state or runtime GitHub polling.

## Design and maintenance boundaries

- **Hub:** dark teal, expressive typography, copper details, and three different invitations into the work. The avatar palette informs this identity without putting the avatar in the hero.
- **Book:** burgundy ink, warm type, centered title, a quiet manuscript note, and spacious reading layouts. This is visual atmosphere, not an invented claim about the book's genre.
- **Code:** dark teal technical surface, cyan/ice type, structured project cards, visible implementation notes, and a compact repository index.
- **Voice:** warm studio-like space, large editorial type, an immediate listening area, and direct production inquiries. There are no decorative fake audio controls.

The existing hidden performance is owned exclusively by `src/experiences/hub/` and mounted only in the root page. It must never move into a shared layout, footer, document, or professional microsite. Its listener is cleaned up on unmount; its video exists only while its accessible dialog is open. The verified guest-singer description is preserved there. Discovery details are intentionally omitted from this guide.

Canonical URLs, Open Graph metadata, and reciprocal `en-US`/`pt-BR`/`x-default` alternates are defined in `src/lib/seo.ts`. The language switcher preserves the About/landing destination. The HTML language is correct in the exported document, before hydration.

The static host must support directory indexes and serve `404.html` with a 404 status. See the [Next.js multiple-root-layout documentation](https://nextjs.org/docs/app/api-reference/file-conventions/layout) for the framework convention used here.

## GitHub Pages deployment

The public repository is Clopes1997/clopes.dev. Its stable GitHub ID (1396298159) is excluded in the shared project model, so the portfolio never appears in its own cards, shelf, or filters.

The Pages workflow builds on pushes to main and manual dispatches, then publishes out/. It reads the site's base path and public URL from actions/configure-pages. Native links, images, audio, redirects, metadata, and the framework assets support the /clopes.dev subdirectory; local development stays at /.

For a custom domain later, configure the domain and DNS in GitHub Pages settings and rerun the workflow. Pages supplies the new URL and empty base path automatically. No hosting migration is required.
