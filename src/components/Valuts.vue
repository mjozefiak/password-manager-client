<template>
    <div class="valuts">
      <h2>Wpisy w folderze: {{ folder.name }}</h2>
      <ul>
        <li
          v-for="valut in valuts"
          :key="valut.id"
        >
          <div>
            <strong>{{ valut.name }}</strong> - {{ valut.description }}
          </div>
          <button @click="deleteValut(valut.id)">Usuń</button>
        </li>
      </ul>
      <div class="add-valut">
        <input v-model="newName" placeholder="Nazwa" />
        <input v-model="newDescription" placeholder="Opis" />
        <input v-model="newPassword" placeholder="Hasło" type="password" />
        <button @click="addValut">Dodaj</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import { createValut, deleteValut } from '../api';
  
  export default {
    props: {
      folder: Object,
      valuts: Array,
    },
    emits: ['valuts-changed'],
    setup(props, { emit }) {
      const newName = ref('');
      const newDescription = ref('');
      const newPassword = ref('');
  
      async function addValut() {
        if (!newName.value.trim() || !newPassword.value.trim()) return alert('Nazwa i hasło są wymagane');
        await createValut({
          name: newName.value,
          description: newDescription.value,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          folder: props.folder.id,
          password: newPassword.value,
          owner: null,
        });
        newName.value = '';
        newDescription.value = '';
        newPassword.value = '';
        emit('valuts-changed');
      }
  
      async function deleteValut(id) {
        if (!confirm('Na pewno usunąć wpis?')) return;
        await deleteValut(id);
        emit('valuts-changed');
      }
  
      return {
        newName,
        newDescription,
        newPassword,
        addValut,
        deleteValut,
      };
    },
  };
  </script>
  
  <style scoped>
  .valuts {
    flex-grow: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  
  ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 1rem;
    overflow-y: auto;
    flex-grow: 1;
  }
  
  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.3rem 0.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .add-valut {
    display: flex;
    gap: 0.5rem;
  }
  
  input {
    padding: 0.25rem 0.5rem;
    flex-grow: 1;
  }
  
  button {
    cursor: pointer;
  }
  </style>
  