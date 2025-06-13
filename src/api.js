// src/api.js
import axios from 'axios';
import router from './router';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000';

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
      if (
         error.response &&
         (error.response.status === 401 || error.response.status === 403)
      ) {
         localStorage.removeItem('token');
         router.push('/auth');
      }
      return Promise.reject(error);
   }
);

export async function fetchFolders() {
   const res = await api.get('/api/folders');
   return res.data;
}

export async function createFolder(data) {
   const res = await api.post('/api/folders', data);
   return res.data;
}

export async function updateFolder(id, data) {
   const res = await api.patch(`/api/folders/${id}`, data, {
      headers: { 'Content-Type': 'application/merge-patch+json' },
   });
   return res.data;
}

export async function deleteFolder(id) {
   await api.delete(`/api/folders/${id}`);
}

export async function fetchValuts(folderId) {
   const res = await api.get(`/api/valuts/folder/${folderId}`);
   return Array.isArray(res.data) ? res.data : [];
}

export async function createValut(data) {
   const res = await api.post('/api/valuts', data);
   return res.data;
}

export const updateValut = async ({ id, data }) => {
   try {
      const response = await api.patch(`api/valuts/${id}`, data, {
         headers: { 'Content-Type': 'application/merge-patch+json' },
      });
      return response.data;
   } catch (error) {}
};

export const deleteValut = async ({ id }) => {
   try {
      const response = await api.delete(`api/valuts/${id}`);
      return response;
   } catch (error) {}
};

export const login = async ({ email, password }) => {
   try {
      const response = await api.post('/api/auth', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      return token;
   } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
   }
};

export const register = async ({ email, password }) => {
   const response = await api.post('/api/register', { email, password });
   return response;
};
