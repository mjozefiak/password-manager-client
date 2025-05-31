<template>
  <div class="dashboard-container">
    <Folders 
      :folders="folders" 
      :selectedFolderId="selectedFolderId" 
      @folder-selected="onFolderSelected" 
      @folder-changed="loadFolders" 
    />
    <!-- <Valuts :folderId="selectedFolderId" /> -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Folders from '@/components/Folders.vue';
// import Valuts from '@/components/Valuts.vue';
import { fetchFolders } from '../api';

export default {
  components: { Folders },
  setup() {
    const folders = ref([]);
    const selectedFolderId = ref(null);

    async function loadFolders() {
      try {
        folders.value = await fetchFolders();
        if (folders.value.length > 0 && !selectedFolderId.value) {
          selectedFolderId.value = folders.value[0].id;
        }
      } catch (error) {
        console.error('Błąd podczas ładowania folderów:', error);
      }
    }

    function onFolderSelected(folder) {
      selectedFolderId.value = folder ? folder.id : null;
    }

    onMounted(() => {
      loadFolders();
    });

    return {
      folders,
      selectedFolderId,
      loadFolders,
      onFolderSelected,
    };
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
}
</style>
