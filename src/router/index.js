import {
  createRouter,
  createWebHistory,
} from 'vue-router';

// Получаем базовый URL из переменных окружения или используем дефолтный путь
const base = import.meta.env.BASE_URL || '/';

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
  // Добавляем маршрут перенаправления для 404 страниц
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(base),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router 