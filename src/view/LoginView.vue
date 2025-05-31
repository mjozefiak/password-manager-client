<template>
    <AuthForm
      title="Zaloguj się"
      buttonText="Zaloguj"
      :onSubmit="login"
    />
  </template>
  
  <script setup>
  import AuthForm from '@/components/AuthForm.vue'
  import axios from 'axios'
  
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/auth', {
        email,
        password
      })
  
      const token = res.data.token
      localStorage.setItem('token', token)
      alert('Zalogowano pomyślnie')
    } catch (err) {
      if (err.response?.status === 401) {
        throw new Error('Nieprawidłowy email lub hasło.')
      }
      throw new Error('Błąd logowania.')
    }
  }
  </script>
  