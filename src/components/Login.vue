<template>
    <div class="flex justify-center gap-5 flex-col items-center h-screen">
        <InputText type="text" v-model="username" />
        <InputText type="text" v-model="password" />
        <Button @click="handleClick">Click Me</Button>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const handleClick = () => {
    console.log('Username:', username.value);
    console.log('Password:', password.value);
};
</script>