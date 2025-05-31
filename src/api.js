// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchFolders() {
  const res = await api.get('/folders');
  return res.data.member;
}

export async function createFolder(data) {
  const res = await api.post('/folders', data);
  return res.data;
}

export async function updateFolder(id, data) {
  const res = await api.patch(`/folders/${id}`, data);
  return res.data;
}

export async function deleteFolder(id) {
  await api.delete(`/folders/${id}`);
}

export async function fetchValuts(folderId) {
  const res = await api.get('/valuts');
  // filtrujemy po folderId (zakładam, że folder to URL)
  return res.data.member.filter(valut => valut.folder && valut.folder.endsWith(`/${folderId}`));
}

export async function createValut(data) {
  const res = await api.post('/valuts', data);
  return res.data;
}

export async function updateValut(id, data) {
  const res = await api.patch(`/valuts/${id}`, data);
  return res.data;
}

export async function deleteValut(id) {
  await api.delete(`/valuts/${id}`);
}
