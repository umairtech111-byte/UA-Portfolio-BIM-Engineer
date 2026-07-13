# Umair Ahmad — BIM Engineer Portfolio

Portfolio website with secure admin sessions, shared live content, and direct
file uploads to Vercel Blob.

## One-time Vercel setup

1. Import this GitHub repository into Vercel.
2. In the project, open **Storage**, create a **Blob** store, choose **Public**
   access, and connect it to Production and Preview. Vercel creates
   `BLOB_READ_WRITE_TOKEN` automatically.
3. In **Settings → Environment Variables**, add:

   - `ADMIN_PASSWORD`: the private password used to open admin mode.
   - `SESSION_SECRET`: a long random value. Generate one with
     `openssl rand -base64 48`.

4. Redeploy the project after adding the variables.
5. Open the deployed website, use the lock button, sign in, and click
   **Publish Live** once to create the initial shared portfolio data.

Never add real environment variable values to Git. `.env.example` contains
only placeholders.

## Local development

```bash
npm install
npm run dev
```

The first `npm run dev` opens the Vercel CLI setup. Link the existing project
and run `vercel env pull .env.local` to obtain its development environment
variables. The CLI prints the local URL, normally `http://localhost:3000`.

## Production build

```bash
npm run build
npm run preview
```

The build script writes the deployable website to `dist/`. Vercel uses the settings in
`vercel.json` automatically.

## Portfolio editing and files

The server verifies the admin password and creates an eight-hour, HTTP-only
signed session cookie. The password and session secret are never shipped in
the public JavaScript bundle.

Files upload directly from the browser to Vercel Blob and may be up to 100 MB.
Portfolio metadata is stored as a versioned JSON blob. Clicking **Publish
Live**, or saving an edited item, updates that shared JSON. Every visitor then
loads the same latest version without a Git commit or Vercel redeployment.

Legacy IndexedDB/localStorage data is used only as a fallback when no shared
portfolio has been published yet, allowing old browser-only edits to be
published after the first secure sign-in.
