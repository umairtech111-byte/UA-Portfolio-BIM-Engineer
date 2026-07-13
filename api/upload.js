import { handleUpload } from '@vercel/blob/client';
import { isAuthenticated, json } from './_auth.js';

const MAX_UPLOAD_BYTES = 100 * 1024 * 1024;

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = await request.json();
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async pathname => {
        if (!isAuthenticated(request)) throw new Error('Unauthorized');
        if (!pathname.startsWith('portfolio/uploads/')) throw new Error('Invalid upload path');
        return {
          addRandomSuffix: true,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('Portfolio upload completed:', blob.pathname);
      },
    });
    return Response.json(response);
  } catch (error) {
    console.error('Upload API error:', error);
    return json({ error: error.message || 'Upload failed' }, error.message === 'Unauthorized' ? 401 : 400);
  }
}
