const API_BASE_URL = 'https://api.example.com';

export const api = {
  get: async (endpoint) => fetch(`${API_BASE_URL}${endpoint}`),
  post: async (endpoint, body) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
};
