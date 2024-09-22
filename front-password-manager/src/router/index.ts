import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from '../store/userStore';

import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import NotFound from '../pages/NotFound.vue';
import Test from '../pages/Test.vue';
import Vaults from '../pages/Vaults.vue';
import Passwords from '../pages/Passwords.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login},
    { path: '/test', component: Test, meta: { requiresAuth: true }},
    { path: '/vaults', component: Vaults},
    { path: '/passwords', component: Passwords},
    { path: '/:pathMatch(.*)*', component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  console.log(to.meta.requiresAuth, userStore.isAuthenticated);

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
});