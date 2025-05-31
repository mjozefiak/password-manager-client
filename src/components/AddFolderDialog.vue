<template>
   <Dialog
      :visible="visible"
      @update:visible="emit('update:visible', $event)"
      modal
      header="Add Folder"
      :style="{ width: '350px' }"
      :closable="true"
      class="rounded-lg"
      contentClass="p-6 bg-surface-0"
      @hide="onCancel"
   >
      <form @submit.prevent="onAdd">
         <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-surface-700"
               >Folder Name</label
            >
            <InputText v-model="folderName" class="w-full" required />
         </div>
         <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-surface-700"
               >Parent Folder</label
            >
            <Select
               v-model="parentId"
               :options="parentFolderOptions"
               optionLabel="name"
               optionValue="id"
               placeholder="None (top level)"
               class="w-full"
            />
         </div>
         <div class="flex justify-end gap-2 mt-6">
            <Button
               @click="onCancel"
               label="Cancel"
               class="p-button-text"
               type="button"
            />
            <Button label="Add" class="p-button-success" type="submit" />
         </div>
      </form>
   </Dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Select from 'primevue/select';

const props = defineProps({
   visible: Boolean,
   folders: {
      type: Array,
      required: true,
   },
});

const emit = defineEmits(['update:visible', 'add']);

const folderName = ref('');
const parentId = ref(null);

const parentFolderOptions = computed(() =>
   [{ id: null, name: 'None (top level)' }].concat(
      props.folders.map((f) => ({ id: f.id, name: f.name }))
   )
);

watch(
   () => props.visible,
   (val) => {
      if (val) {
         folderName.value = '';
         parentId.value = null;
      }
   }
);

function onAdd() {
   if (!folderName.value.trim()) return;
   emit('add', {
      name: folderName.value,
      parentId: parentId.value || null,
   });
   emit('update:visible', false);
}

function onCancel() {
   emit('update:visible', false);
}
</script>
