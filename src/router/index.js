import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/view/AuthView.vue';
import DashboardView from '@/view/DashboardView.vue';

const routes = [
   { path: '/', redirect: '/auth' },
   { path: '/auth', component: AuthView },
   {
      path: '/dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

router.beforeEach((to, from, next) => {
   const isAuthenticated = !!localStorage.getItem('token');
   if (to.path === '/auth' && isAuthenticated) {
      next('/dashboard');
   } else if (to.meta.requiresAuth && !isAuthenticated) {
      next('/auth');
   } else {
      next();
   }
});

export default router;
