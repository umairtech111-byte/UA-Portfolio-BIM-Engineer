import { createClient } from '@supabase/supabase-js';
import * as tus from 'tus-js-client';

const SUPABASE_URL = 'https://taijzaftsddchzpzialc.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_S7J5jCyQ_DES6HIufAfP6A_DclL04gs';
const STORAGE_BUCKET = 'portfolio-files';
const STANDARD_UPLOAD_LIMIT = 6 * 1024 * 1024;

const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

async function uploadStandard(pathname, file) {
  const { error } = await client.storage.from(STORAGE_BUCKET).upload(pathname, file, {
    cacheControl: '3600',
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  });
  if (error) throw error;
}

async function uploadResumable(pathname, file, onProgress) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) throw new Error('Your admin session expired. Sign in again.');

  await new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: `${SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 1000, 3000, 5000, 10000],
      headers: {
        authorization: `Bearer ${session.access_token}`,
        apikey: SUPABASE_PUBLISHABLE_KEY,
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName: STORAGE_BUCKET,
        objectName: pathname,
        contentType: file.type || 'application/octet-stream',
        cacheControl: '3600',
      },
      chunkSize: 6 * 1024 * 1024,
      onError: reject,
      onProgress: (uploaded, total) => onProgress?.(total ? Math.round(uploaded / total * 100) : 0),
      onSuccess: resolve,
    });
    upload.findPreviousUploads().then(previous => {
      if (previous.length) upload.resumeFromPreviousUpload(previous[0]);
      upload.start();
    }).catch(reject);
  });
}

async function uploadFile(pathname, file, onProgress) {
  if (file.size > STANDARD_UPLOAD_LIMIT) await uploadResumable(pathname, file, onProgress);
  else await uploadStandard(pathname, file);
  const { data } = client.storage.from(STORAGE_BUCKET).getPublicUrl(pathname);
  return { url: data.publicUrl, pathname };
}

window.supabaseClient = client;
window.supabaseUploadFile = uploadFile;
window.supabaseStorageBucket = STORAGE_BUCKET;
