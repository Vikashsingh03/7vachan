const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function api(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.error || 'Request failed');
  return data;
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('vachan_token');
}

export function setToken(t) {
  localStorage.setItem('vachan_token', t);
}

export function clearAuth() {
  localStorage.removeItem('vachan_token');
  localStorage.removeItem('vachan_user');
}

export function getUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('vachan_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
