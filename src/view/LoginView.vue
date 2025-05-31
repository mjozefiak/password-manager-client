<template>
    <AuthForm
      title="Zaloguj się"
      buttonText="Zaloguj"
      :onSubmit="login"
    />
  </template>
  
  <script setup>
    import AuthForm from '@/components/AuthForm.vue'
  </script>
  