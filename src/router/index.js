import {
  createRouter,
  createWebHistory,
} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/avatar',
    name: 'Avatar',
    component: () => import('@/views/Avatar.vue')
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/views/Community.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  },
  // Перенаправление для всех других маршрутов
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/' 
  }
]

// Используем baseUrl из Vite конфигурации
const router = createRouter({
  history: createWebHistory('/avatar.ai/'),
  routes
})

export default router 