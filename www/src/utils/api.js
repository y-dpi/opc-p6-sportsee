// Dependencies.
import { IS_MOCK, API_BASE_URL, getTokenCookie } from './auth.js';

// Authenticated API GET wrapper.
async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getTokenCookie()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}.`);
  }

  return response.json();
}

// Format Date as YYYY-MM-DD string.
function toDateParam(date) {
  return new Date(date).toISOString().split('T')[0];
}

// Get the current user's profile and aggregate statistics.
export async function getUserInfo() {
  if (IS_MOCK) {
    return (await import('../mock-data/userInfo.json')).default;
  }

  return apiGet('/api/user-info');
}

// Get the user's running sessions between two dates.
/**
 * @param {Date} startWeek
 * @param {Date} endWeek
 */
export async function getUserActivity(startWeek, endWeek) {
  if (IS_MOCK) {
    return (await import('../mock-data/userActivity.json')).default;
  }

  const params = new URLSearchParams({
    startWeek: toDateParam(startWeek),
    endWeek: toDateParam(endWeek),
  });

  return apiGet(`/api/user-activity?${params}`);
}
