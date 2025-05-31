<template>
  <div class="folders">
    <h2>Foldery</h2>

    <!-- Formularz dodawania folderu -->
    <div class="add-folder">
      <input v-model="newFolderName" placeholder="Nowy folder" />
      <button @click="addFolder">Dodaj</button>
    </div>

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
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { createFolder, deleteFolder as apiDeleteFolder } from '@/api';

export default {
  props: {
    folders: Array,
    selectedFolderId: [String, Number, null], // dodaj ten props
  },
  emits: ['folder-selected', 'folder-changed'],
  setup(props, { emit }) {
    const newFolderName = ref('');

    watch(
      () => props.folders,
      (folders) => {
        if (folders.length > 0 && !props.selectedFolderId) {
          emit('folder-selected', folders[0]);
        }
      },
      { immediate: true }
    );

    function selectFolder(folder) {
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
      if (props.selectedFolderId === id) {
        emit('folder-selected', null);
      }
      emit('folder-changed');
    }

    return {
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
  margin-bottom: 1rem;
  z-index: 999;
}

input {
  flex-grow: 1;
  padding: 0.25rem 0.5rem;
}
</style>
