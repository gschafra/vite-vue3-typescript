import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Dashboard from './views/Dashboard.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { fullscreen: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});