<template>
   <div class="w-64 border-r border-gray-200 p-6 flex flex-col h-full">
      <h2
         class="text-2xl font-bold mb-6 font-sans tracking-tight text-gray-800"
      >
         Foldery
      </h2>
      <Button
         icon="pi pi-plus"
         label="Add Folder"
         class="mb-4 w-full p-button-success"
         @click="showAddFolder = true"
      />
      <PanelMenu :model="panelMenuModel" class="w-full" />
      <AddFolderDialog
         v-model:visible="showAddFolder"
         :folders="props.folders"
         @add="addFolder"
      />
   </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import PanelMenu from 'primevue/panelmenu';
import Button from 'primevue/button';
import AddFolderDialog from './AddFolderDialog.vue';

const props = defineProps({
   folders: {
      type: Array,
      required: true,
   },
});

const emit = defineEmits(['folder-selected', 'folder-added']);

const showAddFolder = ref(false);

function buildTree(folders, parentId = null) {
   if (!Array.isArray(folders)) return [];
   return folders
      .filter((folder) => folder && folder.parentId === parentId)
      .map((folder) => {
         const children = buildTree(folders, folder.id);
         return {
            key: folder.id,
            label: folder.name,
            icon: 'pi pi-folder',
            items: children.length > 0 ? children : undefined,
            folderRef: folder,
            command: (event) => emit('folder-selected', event.item.folderRef),
         };
      });
}

const panelMenuModel = computed(() => buildTree(props.folders ?? []));

function addFolder(newFolder) {
   emit('folder-added', newFolder);
}
</script>
