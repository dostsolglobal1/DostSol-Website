import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dostsol-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Normalises every failure into { message, fields } so forms can render
 * server-side validation without caring about the transport.
 */
export function toFormError(error) {
  const res = error?.response?.data;
  if (res) {
    return { message: res.message || 'Something went wrong.', fields: res.fields || {} };
  }
  if (error?.code === 'ECONNABORTED') {
    return { message: 'The request timed out. Please try again.', fields: {} };
  }
  return {
    message: 'We could not reach the server. Please check your connection or call us directly.',
    fields: {},
  };
}
