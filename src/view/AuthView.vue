<template>
   <div class="flex justify-center items-center min-h-screen">
      <div class="p-card p-4 max-w-2xl bg-white rounded-xl shadow-lg w-xl">
         <TabView v-model:activeIndex="activeTab">
            <TabPanel>
               <template #header>
                  <div class="flex flex-col items-center justify-center">
                     <i class="pi pi-sign-in text-xl mb-1"></i>
                     <span>Zaloguj się</span>
                  </div>
               </template>
               <LoginForm
                  title="Zaloguj się"
                  buttonText="Zaloguj"
                  :onSubmit="login"
               />
            </TabPanel>
            <TabPanel>
               <template #header>
                  <div class="flex flex-col items-center justify-center">
                     <i class="pi pi-user-plus text-xl mb-1"></i>
                     <span>Zarejestruj się</span>
                  </div>
               </template>
               <RegisterForm
                  title="Zarejestruj się"
                  buttonText="Zarejestruj"
                  :onSubmit="register"
               />
            </TabPanel>
         </TabView>
      </div>
   </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import RegisterForm from '@/components/RegisterForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import { login as loginApi, register as registerApi } from '@/api';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const login = async ({ email, password }) => {
   try {
      await loginApi({ email, password });
      toast.add({
         severity: 'success',
         summary: 'Logowanie powiodło się',
         detail: 'Teraz możesz korzystać z aplikacji.',
         life: 4000,
      });
      router.push('/dashboard');
   } catch (error) {
      toast.add({
         severity: 'error',
         summary: 'Błąd logowania',
         detail: error.message || 'Wystąpił nieoczekiwany błąd.',
         life: 4000,
      });
   }
};
const register = async ({ email, password }) => {
   try {
      await registerApi({ email, password });
      activeTab.value = 0;
      toast.add({
         severity: 'success',
         summary: 'Rejestracja powiodła się',
         detail: 'Teraz możesz się zalogować.',
         life: 4000,
      });
   } catch (error) {
      toast.add({
         severity: 'error',
         summary: 'Błąd rejestracji',
         detail: error.message || 'Wystąpił nieoczekiwany błąd.',
         life: 4000,
      });
   }
};

const activeTab = ref(0);
</script>
