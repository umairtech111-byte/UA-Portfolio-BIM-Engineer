import { isAuthenticated, json } from '../_auth.js';

export default async function handler(request) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405);
  return json({ authenticated: isAuthenticated(request) });
}
