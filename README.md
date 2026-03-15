# Muhammad Sobri Maulana Portfolio (React + Vite)

A modern, SEO-friendly personal portfolio with no backend. All content is sourced from local JSON files.

## Tech Stack
- React + Vite
- React Router
- React Helmet Async for SEO metadata
- Pure CSS (responsive + dark mode)

## Getting Started
```bash
npm install
npm run dev
```

## Build for Production
```bash
npm run build
npm run preview
```

## Data-Driven Content
Update these files to add/edit content:
- `src/data/profile.json`
- `src/data/publications.json`
- `src/data/projects.json`
- `src/data/talks.json`
- `src/data/awards.json`
- `src/data/certificates.json`
- `src/data/media.json`
- `src/data/links.json`

Each item supports:
- `id`, `type`, `title`, `subtitle`, `year`, `date`
- `authors` or `collaborators`
- `venue`, `description`, `tags`, `category`, `status`
- `thumbnail`, `featured`, `links`
- `proofType`, `sourceLabel`

## Adding New Entries
1. Pick the relevant JSON file in `src/data/`.
2. Copy an existing object and update its values.
3. Ensure `id` is unique and `date` is ISO format (`YYYY-MM-DD`).
4. Add useful `tags` and `category` to improve filtering.
5. Set `featured: true` to show on homepage highlights.

## Deployment
### Netlify
1. Push repository to GitHub.
2. Create a new Netlify site from Git.
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel
1. Import project to Vercel.
2. Framework preset: `Vite`.
3. Build command: `npm run build`
4. Output directory: `dist`

## SEO Notes
- Dynamic title/description per page.
- Open Graph and Twitter tags in `index.html` + page overrides.
- JSON-LD schema for Person and creative/scholarly works.
- Route-based structure is sitemap-ready.
