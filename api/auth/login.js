import { createSessionToken, json, passwordMatches, sessionCookie } from '../_auth.js';

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
    return json({ error: 'Admin authentication is not configured' }, 503);
  }

  const { password = '' } = await request.json().catch(() => ({}));
  if (!passwordMatches(password)) return json({ error: 'Incorrect password' }, 401);

  return json(
    { authenticated: true },
    200,
    { 'Set-Cookie': sessionCookie(createSessionToken()) },
  );
}
