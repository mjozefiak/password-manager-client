<template>
  <div id="app" class="app-container">
    <header class="app-header">
      <h1>Password Manager</h1>
    </header>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.app-header {
  background: #2c3e50;
  padding: 1rem;
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.app-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
</style>
