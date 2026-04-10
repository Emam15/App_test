import { apiCall } from './client';

// Get all announcements
export const getAnnouncements = () =>
  apiCall('/announcements', 'GET');

// Admin - Create announcement
export const createAnnouncement = (data) =>
  apiCall('/announcements', 'POST', data);

// Admin - Update announcement
export const updateAnnouncement = (id, data) =>
  apiCall(`/announcements/${id}`, 'PUT', data);

// Admin - Delete announcement
export const deleteAnnouncement = (id) =>
  apiCall(`/announcements/${id}`, 'DELETE');