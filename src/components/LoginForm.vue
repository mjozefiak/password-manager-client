<template>
   <div class="flex justify-center items-center">
      <div class="p-card p-4 w-full max-w-md bg-white rounded-xl shadow-lg">
         <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
            <h2 class="text-center text-2xl font-semibold mb-2 text-gray-800">
               {{ title }}
            </h2>
            <div>
               <label class="block text-sm font-medium mb-1 text-gray-700"
                  >Email</label
               >
               <InputText
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  class="w-full"
                  required
               />
            </div>
            <div>
               <label class="block text-sm font-medium mb-1 text-gray-700"
                  >Hasło</label
               >
               <InputText
                  v-model="password"
                  type="password"
                  placeholder="Hasło"
                  class="w-full"
                  required
               />
            </div>
            <Button
               type="submit"
               label="Zaloguj"
               class="w-full p-button p-button-success"
            />
            <p v-if="error" class="text-red-600 text-sm text-center">
               {{ error }}
            </p>
         </form>
      </div>
   </div>
</template>

<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps({
   title: String,
   buttonText: String,
   onSubmit: Function,
});

const email = ref('');
const password = ref('');
const error = ref(null);

const handleLogin = async () => {
   await props.onSubmit({ email: email.value, password: password.value });
};
</script>
