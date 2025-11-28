// src/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './config';

/**
 * Keys in AsyncStorage:
 * - accessToken
 * - refreshToken
 */

export async function saveTokens({ access, refresh }) {
  await AsyncStorage.setItem('accessToken', access);
  await AsyncStorage.setItem('refreshToken', refresh);
}

export async function clearTokens() {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
}

export async function getAccessToken() {
  return await AsyncStorage.getItem('accessToken');
}

export async function getRefreshToken() {
  return await AsyncStorage.getItem('refreshToken');
}

export async function getAuthHeaders() {
  const token = await getAccessToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Attempt to refresh access token. Returns new access token or null.
 */
export async function refreshAccessToken() {
  const refresh = await getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await fetch(`${BASE_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      // refresh failed
      await clearTokens();
      return null;
    }

    const data = await res.json();
    const newAccess = data.access;
    if (newAccess) {
      await AsyncStorage.setItem('accessToken', newAccess);
      return newAccess;
    }
  } catch (e) {
    console.log('refreshAccessToken error', e);
  }
  return null;
}

/**
 * Generic fetch wrapper that tries to refresh token on 401 once.
 */
export async function fetchWithAuth(url, options = {}, tryRefresh = true) {
  const headers = options.headers || {};
  const authHeaders = await getAuthHeaders();
  options.headers = { ...headers, ...authHeaders };

  let res = await fetch(url, options);

  if ((res.status === 401 || res.status === 403) && tryRefresh) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      options.headers = { ...headers, Authorization: `Bearer ${newAccess}`, 'Content-Type': 'application/json' };
      res = await fetch(url, options);
    }
  }

  return res;
}

/* Profile helpers */
export async function getProfile() {
  const res = await fetchWithAuth(`${BASE_URL}/api/profile/`, { method: 'GET' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch profile: ${res.status} ${text}`);
  }
  return res.json();
}

export async function updateProfile(payload) {
  const res = await fetchWithAuth(`${BASE_URL}/api/profile/`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update profile: ${res.status} ${text}`);
  }
  return res.json();
}

/* Auth helper */
export async function login(usernameOrEmail, password) {
  const res = await fetch(`${BASE_URL}/api/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: usernameOrEmail, password }),
  });
  if (!res.ok) {
    const txt = await res.text();
    let json = null;
    try { json = JSON.parse(txt); } catch(e) { json = { error: txt }; }
    throw json;
  }
  const data = await res.json();
  // data should contain access and refresh
  if (data.access && data.refresh) {
    await saveTokens({ access: data.access, refresh: data.refresh });
  }
  return data;
}
