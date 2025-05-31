<template>
   <Dialog
      :visible="visible"
      @update:visible="emit('update:visible', $event)"
      modal
      header="Vault Detail"
      :style="{ width: '700px' }"
      :closable="true"
      @hide="onClose"
      class="rounded-lg"
      contentClass="p-6 bg-surface-0"
   >
      <form @submit.prevent="onSave">
         <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-surface-700"
               >Name</label
            >
            <InputText v-model="localVault.name" class="w-full" required />
         </div>
         <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-surface-700"
               >Email</label
            >
            <InputText v-model="localVault.email" class="w-full" required />
         </div>
         <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-surface-700"
               >Description</label
            >
            <Textarea
               v-model="localVault.description"
               class="w-full"
               autoResize
               rows="2"
            />
         </div>
         <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-surface-700"
               >Password</label
            >
            <Password
               v-model="localVault.password"
               class="w-full"
               inputClass="w-full"
               :feedback="false"
               toggleMask
               required
            />
         </div>
         <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-surface-700"
               >Folder</label
            >
            <Select
               v-model="localVault.folderId"
               :options="folderOptions"
               optionLabel="name"
               optionValue="id"
               placeholder="Select Folder"
               class="w-full"
            />
         </div>
         <div class="mb-4">
            <label class="block text-sm font-medium mb-1 text-surface-700"
               >Custom Fields</label
            >
            <div
               v-for="(field, idx) in localVault.customFields"
               :key="idx"
               class="flex gap-2 mb-2 items-center"
            >
               <InputText
                  v-model="field.name"
                  placeholder="Field Name"
                  class="w-1/3"
               />
               <Password
                  v-model="field.value"
                  class="w-full"
                  inputClass="w-full"
                  :feedback="false"
                  toggleMask
                  :inputId="'custom-password-' + idx"
                  placeholder="Field Value"
               />
               <Button
                  type="button"
                  @click="confirmRemoveCustomField(idx)"
                  icon="pi pi-trash"
                  severity="danger"
                  variant="outlined"
                  aria-label="Remove custom field"
               />
            </div>
            <Button
               icon="pi pi-plus"
               label="Add Field"
               class="p-button-sm p-button-outlined mt-2"
               @click="addCustomField"
            />
         </div>
         <div class="flex justify-end gap-2 mt-6">
            <Button
               @click="onClose"
               label="Close"
               class="p-button-text"
               type="button"
            />
            <Button label="Save" class="p-button-primary" type="submit" />
         </div>
      </form>
      <Dialog
         v-model:visible="showRemoveConfirm"
         modal
         header="Remove Custom Field"
         :closable="true"
         :style="{ width: '350px' }"
         @hide="showRemoveConfirm = false"
         class="rounded-lg"
         contentClass="p-6 bg-surface-0"
      >
         <div class="mb-4 text-surface-700">
            Are you sure you want to remove this custom field?
         </div>
         <div class="flex justify-end gap-2 mt-4">
            <Button
               @click="showRemoveConfirm = false"
               label="Cancel"
               class="p-button-text"
            />
            <Button
               @click="doRemoveCustomField"
               label="Remove"
               class="p-button-danger"
            />
         </div>
      </Dialog>
   </Dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
const props = defineProps({
   visible: Boolean,
   vault: {
      type: Object,
      required: true,
   },
   folders: {
      type: Array,
      required: true,
   }
});

const emit = defineEmits(['close', 'save', 'update:visible']);

const localVault = ref(cloneVault(props.vault));

const showRemoveConfirm = ref(false);
const removeIdx = ref(null);

watch(
   () => props.vault,
   (newVal) => {
      localVault.value = cloneVault(newVal);
   },
   { deep: true }
);

function cloneVault(vault) {
   return {
      ...vault,
      customFields: vault.customFields
         ? vault.customFields.map((f) => ({ ...f }))
         : [],
   };
}

const folderOptions = computed(() =>
   props.folders.map((f) => ({ id: f.id, name: f.name }))
);

function addCustomField() {
   if (!localVault.value.customFields) localVault.value.customFields = [];
   localVault.value.customFields.push({ name: '', value: '' });
}

function confirmRemoveCustomField(idx) {
   removeIdx.value = idx;
   showRemoveConfirm.value = true;
}

function doRemoveCustomField() {
   if (removeIdx.value !== null && localVault.value.customFields) {
      localVault.value.customFields.splice(removeIdx.value, 1);
   }
   showRemoveConfirm.value = false;
   removeIdx.value = null;
}

function onClose() {
   emit('close');
}

function onSave() {
   // Remove empty custom fields
   localVault.value.customFields = (localVault.value.customFields || []).filter(
      (f) => f.name.trim() !== '' || f.value.trim() !== ''
   );
   emit('save', { ...localVault.value });
   onClose();
}
</script>
