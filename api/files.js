import { del } from '@vercel/blob';
import { isAuthenticated, json } from './_auth.js';

export default async function handler(request) {
  if (request.method !== 'DELETE') return json({ error: 'Method not allowed' }, 405);
  if (!isAuthenticated(request)) return json({ error: 'Unauthorized' }, 401);

  const { url = '' } = await request.json().catch(() => ({}));
  if (!url.includes('.blob.vercel-storage.com/portfolio/uploads/')) {
    return json({ error: 'Invalid portfolio file URL' }, 400);
  }

  try {
    await del(url);
    return json({ deleted: true });
  } catch (error) {
    console.error('Delete file error:', error);
    return json({ error: 'Could not delete file' }, 500);
  }
}
