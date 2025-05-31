// src/api.js
import axios from 'axios';
import router from './router';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export async function fetchFolders() {
  const res = await api.get('api/folders');
  return res.data.member;
}

export async function createFolder(data) {
  const res = await api.post('api/folders', data);
  return res.data;
}

export async function updateFolder(id, data) {
  const res = await api.patch(`/api/folders/${id}`, data);
  return res.data;
}

export async function deleteFolder(id) {
  await api.delete(`/api/folders/${id}`);
}

export async function fetchValuts(folderId) {
  const res = await api.get('/api/valuts');
  return res.data.member.filter(valut => valut.folder && valut.folder.endsWith(`api/${folderId}`));
}

export async function createValut(data) {
  const res = await api.post('/api/valuts', data);
  return res.data;
}

export const updateValut = async ({id, data}) => {
  try {
    const response = await api.patch(`api/valuts/${id}`, data);
    return response.data;
  }
  catch (error) {

  }
}


export const deleteValut = async ({id}) => {
  try {
    const response = await api.delete(`api/valuts/${id}`);
    return response
  }
  catch (error) {

  }
}

export const auth = async ({email, password}) => {
  try {
    const response = await api.post('/auth', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    router.push('/dashboard');
  }
  catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
}

export const register = async ({email, password}) => {
  try {
    const response = await api.post('/api/register', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
  }
  catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
}