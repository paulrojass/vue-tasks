import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../modules/tasks/components/TasksList.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../modules/auth/components/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../modules/auth/components/Register.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../modules/tasks/components/TasksList.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../modules/categories/components/CategoriesList.vue')
    }
  ]
})

export default router
