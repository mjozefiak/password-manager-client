import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './App.vue';
import ToastService from 'primevue/toastservice';
import LoginView from './view/LoginView.vue';
import InputText from 'primevue/inputtext';
import { Form } from '@primevue/forms';
import RegisterView from './view/RegisterView.vue';
import DashboardView from './view/DashboardView.vue';


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView },
];


const router = createRouter({
   history: createWebHistory(),
   routes,
});

const app = createApp(App);

app.use(PrimeVue, {
   theme: {
      preset: Aura,
      options: {
         prefix: 'p',
         darkModeSelector: 'system',
         cssLayer: false,
      },
   },
});
app.use(router);
app.use(ToastService);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Form', Form);

app.mount('#app');
