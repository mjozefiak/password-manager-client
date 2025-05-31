import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/view/LoginView.vue';
import RegisterView from '@/view/RegisterView.vue';
import DashboardView from '@/view/DashboardView.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.path === '/login' && isAuthenticated) {
    next('/dashboard');
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;