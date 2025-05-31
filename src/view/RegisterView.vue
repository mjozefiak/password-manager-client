<template>
    <AuthForm
      title="Zarejestruj się"
      buttonText="Zarejestruj"
      :onSubmit="register"
    />
  </template>
  
  <script setup>
  import AuthForm from '@/components/AuthForm.vue'
  import axios from 'axios'
  
  const register = async ({ email, password }) => {
    try {
    const response = await axios.post('http://127.0.0.1:8000/api/register', {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('Brak odpowiedzi od serwera');
    }
  }
  }
  </script>
  