import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'portfolio_admin';
const SESSION_SECONDS = 60 * 60 * 8;

function encode(value) {
  return Buffer.from(value).toString('base64url');
}

function signature(payload, secret) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
}

export function passwordMatches(password) {
  const configured = process.env.ADMIN_PASSWORD;
  return Boolean(configured && safeEqual(password, configured));
}

export function createSessionToken() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not configured');
  const payload = encode(JSON.stringify({ exp: Date.now() + SESSION_SECONDS * 1000 }));
  return `${payload}.${signature(payload, secret)}`;
}

export function isAuthenticated(request) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;
  const cookies = request.headers.get('cookie') || '';
  const token = cookies.split(';').map(v => v.trim()).find(v => v.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (!token) return false;
  const [payload, suppliedSignature] = token.split('.');
  if (!payload || !suppliedSignature || !safeEqual(suppliedSignature, signature(payload, secret))) return false;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now();
  } catch {
    return false;
  }
}

export function sessionCookie(token) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_SECONDS}${secure}`;
}

export function clearSessionCookie() {
  const secure = process.env.VERCEL ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

export function json(body, status = 200, headers = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });
}
