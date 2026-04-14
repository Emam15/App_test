import { apiCall } from './client';

// Instructor - Create assignment
export const createAssignment = (data) =>
  apiCall('/assignments', 'POST', data);

// Get assignments for a class
export const getClassAssignments = (classId) =>
  apiCall(`/assignments/class/${classId}`, 'GET');

// Instructor - Delete assignment
export const deleteAssignment = (assignmentId) =>
  apiCall(`/assignments/${assignmentId}`, 'DELETE');

// Student - Submit assignment
export const submitAssignment = (assignmentId, data) =>
  apiCall(`/assignments/${assignmentId}/submit`, 'POST', data);

// Instructor - Get submissions
export const getSubmissions = (assignmentId) =>
  apiCall(`/assignments/${assignmentId}/submissions`, 'GET');

// Instructor - Grade submission
export const gradeSubmission = (assignmentId, submissionId, data) =>
  apiCall(`/assignments/${assignmentId}/submissions/${submissionId}/grade`, 'PUT', data);