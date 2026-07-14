# Umair Ahmad — BIM Engineer Portfolio

Static Vercel portfolio backed by Supabase Auth, Postgres, and Storage.

## Backend

- Supabase project: `taijzaftsddchzpzialc`
- Admin account: `engr.umair.ahmad111@gmail.com`
- Content table: `public.portfolio_content`
- File bucket: `portfolio-files`
- Maximum file size: 100 MB
- Uploads larger than 6 MB use the resumable TUS protocol.

The Supabase URL and publishable browser key are bundled into the frontend.
This is expected for Supabase clients. Database and Storage access is secured
with Row Level Security; no secret or service-role key is included.

## Database setup

The complete schema, bucket, grants, and RLS policies are in:

```text
supabase/migrations/20260714153000_create_portfolio_backend.sql
```

Apply it with the Supabase CLI or paste it into the Supabase Dashboard SQL
Editor and select **Run**.

Create the admin user in **Authentication → Users** with the email listed
above. Disable public email signups after the account exists.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:4173`.

## Production build

```bash
npm run build
```

The dependency-free static output is written to `dist/`. Vercel uses the
settings in `vercel.json`.

## Publishing

Click the lock button, sign in with the Supabase admin password, edit the
portfolio, and select **Publish Live**. Visitors read the same Postgres row and
see the update after refreshing; no Git commit or redeployment is needed.

Legacy browser/base64 and Vercel Blob attachments are moved into Supabase
Storage the first time the administrator publishes them.
