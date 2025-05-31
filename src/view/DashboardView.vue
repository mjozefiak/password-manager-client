<template>
   <div class="w-full flex h-screen bg-surface-100 font-sans">
      <aside
         class="sticky top-0 left-0 h-screen w-72 min-w-[18rem] max-w-xs bg-surface-card shadow-2 border-right-1 border-gray-200 flex-shrink-0 z-10 flex flex-col"
      >
         <Folders
            :folders="folders"
            @folder-selected="onFolderSelected"
            @folder-added="onFolderAdded"
            class="h-full"
         />
      </aside>
      <main
         class="flex-1 overflow-y-auto flex flex-col items-start justify-start p-6 bg-surface-card shadow-2 rounded-lg max-w-5xl w-full mx-auto my-8"
      >
         <VaultList
            v-if="selectedFolder"
            :vaults="filteredVaults"
            :selectedFolderId="selectedFolder?.id"
            :folders="folders"
            @vault-edit="onVaultEdit"
            @vault-create="onVaultCreate"
         />
      </main>
   </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Folders from '@/components/Folders.vue';
import VaultList from '@/components/VaultList.vue';
import {
   fetchFolders,
   createFolder,
   fetchValuts,
   createValut,
   updateValut,
} from '@/api';

const folders = ref([]);
const vaults = ref([]);
const selectedFolder = ref(null);

async function loadFolders() {
   const fetched = await fetchFolders();
   folders.value = Array.isArray(fetched) ? fetched : [];
   if (
      !selectedFolder.value &&
      Array.isArray(folders.value) &&
      folders.value.length > 0
   ) {
      selectedFolder.value = folders.value[0];
   }
}

async function loadVaults(folderId) {
   vaults.value = await fetchValuts(folderId);
}

onMounted(async () => {
   await loadFolders();
   if (selectedFolder.value) {
      await loadVaults(selectedFolder.value.id);
   }
});

function onFolderSelected(folder) {
   selectedFolder.value = folder;
   loadVaults(folder.id);
}

async function onFolderAdded(newFolder) {
   const created = await createFolder(newFolder);
   await loadFolders();
   selectedFolder.value = created;
   await loadVaults(created.id);
}

const filteredVaults = computed(() =>
   Array.isArray(vaults.value)
      ? vaults.value.filter(
           (vault) => vault.folderId === selectedFolder.value?.id
        )
      : []
);

async function onVaultEdit(updatedVault) {
   await updateValut({ id: updatedVault.id, data: updatedVault });
   await loadVaults(selectedFolder.value.id);
}

async function onVaultCreate(newVault) {
   await createValut(newVault);
   await loadVaults(selectedFolder.value.id);
}
</script>
