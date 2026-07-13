import { del, list, put } from '@vercel/blob';
import { isAuthenticated, json } from './_auth.js';

const PREFIX = 'portfolio/data/';

async function versions() {
  const result = await list({ prefix: PREFIX, limit: 100 });
  return result.blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

export default async function handler(request) {
  try {
    if (request.method === 'GET') {
      const [latest] = await versions();
      if (!latest) return json({ error: 'No published portfolio data' }, 404);
      const response = await fetch(latest.url, { cache: 'no-store' });
      if (!response.ok) return json({ error: 'Could not read portfolio data' }, 502);
      return json(await response.json());
    }

    if (request.method === 'PUT') {
      if (!isAuthenticated(request)) return json({ error: 'Unauthorized' }, 401);
      const portfolio = await request.json().catch(() => null);
      if (!portfolio || typeof portfolio !== 'object' || Array.isArray(portfolio)) {
        return json({ error: 'Invalid portfolio data' }, 400);
      }

      const pathname = `${PREFIX}portfolio-${Date.now()}.json`;
      const current = await put(pathname, JSON.stringify(portfolio), {
        access: 'public',
        addRandomSuffix: true,
        contentType: 'application/json',
      });

      const oldVersions = (await versions()).filter(blob => blob.url !== current.url);
      if (oldVersions.length) await del(oldVersions.map(blob => blob.url));
      return json({ saved: true, url: current.url });
    }

    return json({ error: 'Method not allowed' }, 405);
  } catch (error) {
    console.error('Portfolio API error:', error);
    return json({ error: 'Cloud storage is not configured or unavailable' }, 503);
  }
}
