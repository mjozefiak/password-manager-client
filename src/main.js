import { createApp } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './App.vue';
import ToastService from 'primevue/toastservice';
import LoginView from './view/LoginView.vue';
import InputText from 'primevue/inputtext';
import { Form } from '@primevue/forms';

const routes = [{ path: '/login', component: LoginView }];

const router = createRouter({
   history: createMemoryHistory(),
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
