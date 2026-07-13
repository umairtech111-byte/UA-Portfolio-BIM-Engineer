import { clearSessionCookie, json } from '../_auth.js';

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  return json({ authenticated: false }, 200, { 'Set-Cookie': clearSessionCookie() });
}
