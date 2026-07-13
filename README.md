# Umair Ahmad — BIM Engineer Portfolio

Static portfolio website prepared for Vercel deployment.

## Local development

```bash
npm run dev
```

Open `http://localhost:5173`. No dependency installation is required.

## Production build

```bash
npm run build
npm run preview
```

The build script writes the deployable website to `dist/`. Vercel uses the settings in
`vercel.json` automatically.

## Portfolio editing and files

Admin edits are stored in IndexedDB in the current browser, avoiding the old
approximately 5 MB `localStorage` limit. Individual attachments can be up to
50 MB. Use **Export for Vercel**, replace the repository's `index.html` with
the downloaded file, commit it, and redeploy so visitors receive those edits.

The admin editor is client-side. Its password is therefore only a convenience,
not secure authentication. For multi-user or remote content management, move
uploads and authentication to a managed backend such as Vercel Blob and an
authenticated server endpoint.
