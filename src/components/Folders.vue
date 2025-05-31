<template>
    <div class="folders">
      <h2>Foldery</h2>
      <ul>
        <li
          v-for="folder in folders"
          :key="folder.id"
          :class="{ selected: folder.id === selectedFolderId }"
          @click="selectFolder(folder)"
        >
          {{ folder.name }}
          <button @click.stop="deleteFolder(folder.id)">🗑️</button>
        </li>
      </ul>
      <div class="add-folder">
        <input v-model="newFolderName" placeholder="Nowy folder" />
        <button @click="addFolder">Dodaj</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import { createFolder, deleteFolder as apiDeleteFolder } from '../api';
  
  export default {
    props: {
      folders: Array,
    },
    emits: ['folder-selected', 'folder-changed'],
    setup(props, { emit }) {
      const selectedFolderId = ref(null);
      const newFolderName = ref('');
  
      watch(
        () => props.folders,
        (folders) => {
          if (folders.length > 0 && !selectedFolderId.value) {
            selectedFolderId.value = folders[0].id;
            emit('folder-selected', folders[0]);
          }
        },
        { immediate: true }
      );
  
      function selectFolder(folder) {
        selectedFolderId.value = folder.id;
        emit('folder-selected', folder);
      }
  
      async function addFolder() {
        if (!newFolderName.value.trim()) return;
        await createFolder({
          name: newFolderName.value,
          parent: null,
          children: [],
          valuts: [],
          owner: null,
        });
        newFolderName.value = '';
        emit('folder-changed');
      }
  
      async function deleteFolder(id) {
        if (!confirm('Na pewno usunąć folder?')) return;
        await apiDeleteFolder(id);
        if (selectedFolderId.value === id) {
          selectedFolderId.value = null;
          emit('folder-selected', null);
        }
        emit('folder-changed');
      }
  
      return {
        selectedFolderId,
        selectFolder,
        newFolderName,
        addFolder,
        deleteFolder,
      };
    },
  };
  </script>
  
  <style scoped>
  .folders {
    width: 250px;
    border-right: 1px solid #ddd;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  
  ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 1rem;
    flex-grow: 1;
    overflow-y: auto;
  }
  
  li {
    cursor: pointer;
    padding: 0.3rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  li.selected {
    background-color: #d0ebff;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #a00;
  }
  .add-folder {
    display: flex;
    gap: 0.5rem;
  }
  input {
    flex-grow: 1;
    padding: 0.25rem 0.5rem;
  }
  </style>
  