import { apiCall } from './client';

export const login = (email, password) =>
  apiCall('/auth/login', 'POST', { email, password });

export const register = (fullName, email, password, confirmPassword) =>
  apiCall('/auth/register', 'POST', { fullName, email, password, confirmPassword });

export const getMe = () =>
  apiCall('/auth/me', 'GET');

export const googleLogin = (idToken) =>
  apiCall('/auth/google-login', 'POST', { token: idToken });
