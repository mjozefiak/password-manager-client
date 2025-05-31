<template>
    <div class="dashboard-container">
      <Folders :selectedFolderId="selectedFolderId" @folderSelected="onFolderSelected" />
      <Valuts :folderId="selectedFolderId" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Folders from '../components/Folders.vue';
  import Valuts from '../components/Valuts.vue';
  
  const selectedFolderId = ref(null);
  
  function onFolderSelected(id) {
    selectedFolderId.value = id;
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    height: 100%;
    gap: 1rem;
  }
  
  .dashboard-container > * {
    background: white;
    border-radius: 6px;
    box-shadow: 0 0 10px rgb(0 0 0 / 0.1);
    overflow-y: auto;
  }

  .dashboard-container > :first-child {
    width: 280px;
    min-width: 280px;
  }

  .dashboard-container > :last-child {
    flex: 1;
    min-width: 0;
  }
  </style>
  