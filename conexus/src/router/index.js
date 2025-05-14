import { createRouter, createWebHistory } from 'vue-router'
import PlanManagementView from '../views/PlanManagementView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/cadastro',
      name: 'Register',
      component: Register
    },
    {
      path: '/planos',
      name: 'plans',
      component: PlanManagementView
    }
  ]
})

export default router
