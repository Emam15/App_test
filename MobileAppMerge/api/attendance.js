import { apiCall } from './client';

// Instructor - Create session
export const createSession = (data) =>
  apiCall('/attendance/session', 'POST', data);

// Student - Check in
export const checkIn = (data) =>
  apiCall('/attendance/check-in', 'POST', data);

// Instructor - End session
export const endSession = (sessionId) =>
  apiCall(`/attendance/end-session/${sessionId}`, 'POST');

// Get active session for class
export const getActiveSession = (classId) =>
  apiCall(`/attendance/active-session/${classId}`, 'GET');