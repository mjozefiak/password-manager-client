<template>
    <AuthForm
      title="Zarejestruj się"
      buttonText="Zarejestruj"
      :onSubmit="register"
    />
  </template>
  
  <script setup>
  import AuthForm from '@/components/RegisterForm.vue'
</script>