// App/api/client.js
import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = 'http://192.168.1.33:5000/api'; // غيره بالـ IP بتاعك

export const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  const finalToken = token || (await AsyncStorage.getItem('token'));

  if (finalToken) headers.Authorization = `Bearer ${finalToken}`;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();

  if (response.status === 401) {
    await AsyncStorage.removeItem('token');
    throw { code: 'UNAUTHORIZED' };
  }

  if (!response.ok) {
    console.error(`API Error [${response.status}] ${endpoint}:`, data);
    throw data;
  }

  return data;
};