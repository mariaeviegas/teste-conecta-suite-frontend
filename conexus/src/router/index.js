import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlanManagementView from '../views/PlanManagementView.vue'
import Login from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/planos',
      name: 'plans',
      component: PlanManagementView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

export default router
