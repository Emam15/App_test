import { apiCall } from './client';

// Instructor - Create class
export const createClass = (data) =>
  apiCall('/classes', 'POST', data);

// Student - Join class
export const joinClass = (joinCode) =>
  apiCall('/classes/join', 'POST', { joinCode });

// Student - Leave class
export const leaveClass = (classId) =>
  apiCall(`/classes/leave/${classId}`, 'DELETE');

// Get my classes (student or instructor)
export const getMyClasses = () =>
  apiCall('/classes/my', 'GET');

// Get class details
export const getClassDetails = (classId) =>
  apiCall(`/classes/${classId}`, 'GET');

// Instructor - Regenerate join code
export const regenerateJoinCode = (classId) =>
  apiCall(`/classes/${classId}/regenerate-code`, 'PATCH');

// Instructor - Delete class
export const deleteClass = (classId) =>
  apiCall(`/classes/${classId}`, 'DELETE');