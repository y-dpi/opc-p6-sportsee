// Cookie name.
export const TOKEN_COOKIE_NAME = 'sportsee-user-token';

// Mock mode: bypass token validation and the backend login request.
export const IS_MOCK = false;

// Backend base URL.
const API_BASE_URL = 'http://localhost:8000';

// Default token in mock mode: no validation so unimportant.
const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyNDU2IiwiaWF0IjoxNzc5OTc2ODUxLCJleHAiOjE3ODAwNjMyNTF9.d13nzkX8P5jYz0-YmCNCIk331cM5mBzVRX4m230bfuk';

// Set the token cookie.
export function setTokenCookie(token) {
  const payload = decodeJwtPayload(token);
  const expires =
    payload && typeof payload.exp === 'number' && payload.exp * 1000 > Date.now()
      ? new Date(payload.exp * 1000).toUTCString()
      : null;

  let cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; SameSite=Strict`;
  if (expires) cookie += `; expires=${expires}`;
  document.cookie = cookie;
}

// Clear the token cookie.
export function clearTokenCookie() {
  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

// Get the token cookie, or null if it is not set.
export function getTokenCookie() {
  return readCookie(TOKEN_COOKIE_NAME);
}

// Log in: store a token cookie, or throw on failure.
export async function login(username, password) {
  if (IS_MOCK) {
    setTokenCookie(MOCK_TOKEN);
    return;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    clearTokenCookie();
    throw new Error('Impossible de contacter le serveur.');
  }

  if (!response.ok) {
    clearTokenCookie();
    throw new Error('Identifiants invalides.');
  }

  const { token } = await response.json();
  setTokenCookie(token);
}

// Read a cookie value by name, or null if it is not set.
function readCookie(name) {
  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null;
}

// Decode JWT or null if malformed (no signature check).
function decodeJwtPayload(token) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  
  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json);

  } catch {
    return null;
  }
}

// Check JWT for valid structure and expiration.
export function hasValidToken() {
  if (IS_MOCK) return true;

  const token = readCookie(TOKEN_COOKIE_NAME);
  if (!token) return false;

  const payload = decodeJwtPayload(token);
  if (!payload) return false;

  if (typeof payload.exp !== 'number') return false;
  return payload.exp * 1000 > Date.now();
}
