# Weerapong Hamathulin Portfolio

Personal portfolio for Weerapong Hamathulin, a creative designer focused on AI-assisted visual production, commercial design, 3D product presentation, and digital media workflows.

The repository contains two public themes that share the same portfolio content:

- **Dark theme:** React application in `src/`
- **Colorful theme:** static experience in `public/colorful/`

## Development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

## Routes

- `/` - Dark portfolio theme
- `/colorful/` - Colorful portfolio theme
- `/admin/` or `/?admin=1` - Portfolio content editor
- `/resume/` - Resume page

## Project Structure

```text
src/                    Dark React theme and shared content logic
public/colorful/        Colorful static theme
public/content/         Published text content
public/portfolio/       Published portfolio images
public/models/          Web-ready 3D assets
public/resume/          Resume assets
scripts/                Content and 3D export utilities
portfolio-prep/         Local working assets and case-study checklists
.github/workflows/      GitHub Pages deployment
```

`portfolio-prep/` is intentionally excluded from Git except for its Markdown checklists. Keep PSD, Blender, source images, and other working files there. Move only final web-ready assets into `public/` through the portfolio workflow.

## Content Workflow

1. Prepare and review source assets in the numbered folders under `portfolio-prep/`.
2. Export final images as WebP when possible.
3. Update text and project media through the Admin page.
4. Verify both themes and the resume page locally.
5. Commit and push to `main`; GitHub Actions deploys the site to GitHub Pages.

When Colorful theme translations change, regenerate its language data with:

```bash
npm run generate:colorful-i18n
```
