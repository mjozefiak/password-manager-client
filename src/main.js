import { createApp } from 'vue';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './App.vue';
import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import { Form } from '@primevue/forms';
import router from './router/index.js';
import Toast from 'primevue/toast';

const app = createApp(App);

app.use(PrimeVue, {
   theme: {
      preset: Aura,
      options: {
         prefix: 'p',
         darkModeSelector: false,
         cssLayer: false,
      },
   },
});
app.use(router);
app.use(ToastService);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Form', Form);
app.component('Toast', Toast);

app.mount('#app');
