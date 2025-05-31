<template>
   <div id="app" class="min-h-screen flex flex-col bg-surface-100 font-sans">
      <header
         class="bg-surface-0 border-b border-surface-200 py-4 text-center shadow-sm"
      >
         <h1 class="text-3xl font-bold text-primary-700 tracking-tight">
            Password Manager
         </h1>
      </header>
      <main class="flex-1 flex justify-center items-stretch">
         <Toast />
         <router-view />
      </main>
   </div>
</template>

<script setup></script>
