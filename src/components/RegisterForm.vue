<template>
    <form @submit.prevent="register({email: email, password: password})" class="form">
      <h2 class="title">{{ title }}</h2>
  
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Hasło" required />
  
      <button type="submit">{{ buttonText }}</button>
  
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { register } from '@/api'
  
  const props = defineProps({
    title: String,
    buttonText: String,
    onSubmit: Function
  })
  
  const email = ref('')
  const password = ref('')
  const error = ref(null)
  </script>
  
  <style scoped>
  .form {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    background: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  button {
    padding: 0.75rem;
    background: #42b983;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  button:hover {
    background: #369f72;
  }
  .error {
    color: red;
    font-size: 0.9rem;
  }
  .title {
    text-align: center;
    margin-bottom: 1rem;
    color: #000;
  }
  </style>
  