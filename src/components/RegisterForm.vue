<template>
   <div class="flex justify-center items-center">
      <div
         class="p-card p-4 w-full max-w-md bg-white rounded-lg shadow border border-gray-100"
      >
         <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
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
                  required
                  class="w-full"
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
                  required
                  class="w-full"
               />
            </div>
            <div>
               <label class="block text-sm font-medium mb-1 text-gray-700"
                  >Potwierdź hasło</label
               >
               <InputText
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Potwierdź hasło"
                  required
                  class="w-full"
               />
            </div>
            <Button
               type="submit"
               label="Zarejestruj"
               class="w-full p-button p-button-success font-semibold"
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
const confirmPassword = ref('');
const error = ref(null);

function handleSubmit() {
   if (password.value !== confirmPassword.value) {
      error.value = 'Hasła nie są takie same';
      return;
   }
   error.value = null;
   props.onSubmit({ email: email.value, password: password.value });
}
</script>
