# Gospel Ibanga — Full Stack Developer Portfolio

A responsive, multi-page static portfolio built with HTML, CSS, and JavaScript. No bundler, dependency installation, or portfolio backend is required.

## Run locally

Open `index.html` directly or serve the folder with VS Code Live Server / another static HTTP server. For clean `/about/`-style routes, deploy to a static host configured to serve each folder's `index.html`; all route folders already contain their own entry page.

## Pages

- `/` — Home, featured work, about and skills previews, and contact CTA
- `/about/` — Biography, development approach, interests, and editable education/experience sections
- `/skills/` — Project-supported technology groups with no proficiency scores
- `/projects/` — Configurable project cards and working category filters
- `/services/` — Development services offered, with no client-work claims
- `/contact/` — Validated contact form, email fallback, and direct contact/social links
- `/resume/` — Print-friendly CV page and optional configurable PDF link

## Central configuration

Edit `site-config.js` to update the public profile details and all structured content. It includes the provided email, phone, WhatsApp number and message, LinkedIn URL, GitHub profile, and portrait path. Location and CV path are intentionally blank. This JavaScript file is public in the browser, so never put secrets or credentials in it.

- `githubUrl` is set to the supplied profile URL.
- Add a city/region to `location` only if you want it published.
- Put your PDF in `assets/` and set `resumeUrl` (for example, `assets/gospel-ibanga-cv.pdf`) to show CV links.
- The skills list contains technologies represented in the two linked projects; edit it to match your current toolkit.
- Add education, work history, and certifications only when accurate and ready to publish.
- Services describe work you can offer; they do not claim prior client engagements.
- Your portrait is in `assets/gospel-ibanga-portrait.jpeg`.

### Projects

The Projects page contains exactly seven cards: two source-linked projects with verified GitHub Pages demos and five clearly labeled editable placeholders. The homepage highlights the two real repositories.

- **Ibangadsweb** — multi-page IBANGA ADS & WEB DEVELOPER business website. Its repository contains HTML pages, Bootstrap 5 markup, project CSS, and JavaScript interactions including theme switching, hero slides, and portfolio filters. Its root repository has no README, so the description is based on the source and the repository's “Official website for my business” summary. [Live demo](https://ibangagospel3-wq.github.io/Ibangadsweb/) · [Source](https://github.com/ibangagospel3-wq/Ibangadsweb)
- **ibanga.ai-dev.tools.com** — an HTML/CSS/JavaScript learning and coding platform with guided lessons/progress, browser playground and live preview, challenges, saved local projects, documentation, and a demo-mode AI helper. Its repository also includes a separate FastAPI/Python backend with PostgreSQL/SQLAlchemy and Gemini integration. [Live demo](https://ibangagospel3-wq.github.io/ibanga.ai-dev.tools.com/) · [Source](https://github.com/ibangagospel3-wq/ibanga.ai-dev.tools.com)

The gallery uses seven original local SVG preview graphics because no genuine project screenshots were present in the project files or repository asset listings. The two project visuals are marked as illustrative—not screenshots—and each of the five placeholder cards has its own distinct “Coming Soon” graphic. Both demos were verified to load when this portfolio was updated. Replace placeholders with verified details in `site-config.js`.

Add a project record using this shape:

```js
{
	name: "Your real project name",
	description: "A short, factual description.",
	image: "assets/your-project-screenshot.webp", // Use only a genuine screenshot; otherwise choose an illustrative local graphic.
	imageAlt: "A factual description of the screenshot or illustrative preview",
	stack: ["A technology you used"],
	category: "Frontend", // Frontend, Full Stack, or Web Design
	liveUrl: "", // Only set after verifying the deployed site.
	githubUrl: "https://github.com/your-real-account/your-real-repo",
	featured: true
}
```

Use only real project details and URLs. Project buttons open new tabs with safe link attributes. `Live Demo` is omitted if `liveUrl` is empty; the source button is omitted unless a valid HTTPS repository URL is present.

## Contact form behavior

The contact form validates its fields and opens the visitor's email application with a message addressed to `ibangagospel3@gmail.com`. It does not send or store messages itself. To accept submissions without relying on a user's mail app, connect a form service or your own backend and update the submit handler in `app.js`. WhatsApp uses the supplied number and URL-encoded greeting; email, call, and LinkedIn use the supplied exact details.

## Themes, accessibility, and motion

Light/dark mode follows the system preference on first visit and persists the selection in `localStorage`. Pages include keyboard focus indicators, labeled forms, a skip link, reduced-motion support, lazy-loaded secondary imagery, and a print stylesheet for the CV.

## Deploy to GitHub Pages

This is plain static HTML/CSS/JavaScript, not a Vite or React project. There is no production build command or base-path setting to maintain. The `.github/workflows/deploy.yml` workflow packages the site root and its route folders, then deploys the artifact when a push targets the repository's current default branch (or when manually dispatched). It does not push or modify Git history.

1. Commit and push this project to the GitHub repository where you want the portfolio hosted. The workflow uses that repository's default branch automatically; it does not assume a repository name.
2. In that repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Open the **Actions** tab, select **Deploy static site to GitHub Pages**, and confirm the deployment run succeeds.
4. Open **Settings → Pages** again. GitHub displays the published URL there and in the successful workflow's `github-pages` environment deployment. For a project site, the URL is normally `https://OWNER.github.io/REPOSITORY/`; for an account site named `OWNER.github.io`, it is `https://OWNER.github.io/`.
5. Verify the homepage, `/about/`, `/projects/`, the portrait asset, and the project links at the published URL. Do not treat a predicted URL as live until the Pages run succeeds and it loads.

The current routes and assets are root-relative to the loaded `app.js`, so they work under a GitHub Pages repository subpath. Pages serves each route folder's `index.html` directly; `404.html` provides a custom not-found view. Both project demos in the cards are separate, verified deployments. No portfolio deployment URL is claimed until this portfolio itself is published.
