<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold font-sans tracking-tight text-surface-800">
        Vaults
      </h2>
      <Button
        v-if="selectedFolderId"
        icon="pi pi-plus"
        label="Add Vault"
        class="p-button-success"
        @click="openCreateVault"
      />
    </div>
    <DataTable
      v-if="vaults && vaults.length"
      :value="vaults"
      class="shadow-2 rounded-lg bg-surface-card"
      dataKey="id"
      @row-click="onRowClick"
      stripedRows
      responsiveLayout="scroll"
    >
      <Column
        field="name"
        header="Name"
        headerClass="!bg-surface-100 !font-semibold !text-surface-700"
      ></Column>
      <Column
        field="description"
        header="Description"
        headerClass="!bg-surface-100 !font-semibold !text-surface-700"
      ></Column>
      <Column
        header=""
        :body="editButtonTemplate"
        style="width: 100px"
        headerClass="!bg-surface-100"
      ></Column>
    </DataTable>
    <div v-else class="text-gray-400 mt-10 text-center text-base">
      No vaults in this folder.
    </div>

    <VaultDetail
          v-model:visible="showVaultDetail"
          :vault="vaultDetail"
          :folders="folders"
          @close="closeVaultDetail"
          @save="onVaultDetailSave"
        />
      </div>
    </template>

    <script setup>
    import { ref, h, computed } from 'vue';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import Button from 'primevue/button';
    import VaultDetail from './VaultDetail.vue';

    const props = defineProps({
      vaults: {
        type: Array,
        required: true,
      },
      selectedFolderId: {
        type: [String, Number],
        default: null,
      },
      folders: {
        type: Array,
        required: true,
      },
    });

const emit = defineEmits(['vault-edit', 'vault-create']);

const showVaultDetail = ref(false);
const vaultDetail = ref({});
const isCreateMode = ref(false);

function openVaultDetail(vault) {
  isCreateMode.value = false;
  vaultDetail.value = {
    ...vault,
    customFields: vault.customFields ? vault.customFields.map(f => ({ ...f })) : [],
  };
  showVaultDetail.value = true;
}

function openCreateVault() {
  isCreateMode.value = true;
  vaultDetail.value = {
    id: '',
    name: '',
    email: '',
    password: '',
    description: '',
    customFields: [],
    folderId: props.selectedFolderId,
  };
  showVaultDetail.value = true;
}

function closeVaultDetail() {
  showVaultDetail.value = false;
  vaultDetail.value = {};
  isCreateMode.value = false;
}

function onVaultDetailSave(updatedVault) {
  if (isCreateMode.value) {
    emit('vault-create', { ...updatedVault });
  } else {
    emit('vault-edit', { ...updatedVault });
  }
  closeVaultDetail();
}

function onRowClick(event) {
  openVaultDetail(event.data);
}

function editButtonTemplate(rowData) {
  return h(Button, {
    label: 'Edit',
    class: 'p-button-text text-blue-600',
    onClick: (e) => {
      e.stopPropagation();
      openVaultDetail(rowData);
    },
  });
}

</script>
