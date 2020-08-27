import { createRouter, createWebHistory } from 'vue-router'
import Register from "@/pages/Register";
import Login from "@/pages/LoginIn";
import DashboardAdmin from "@/pages/DashboardAdmin";
import DashboardManager from "@/pages/DashboardManager";
import DashboardWorker from "@/pages/DashboardWorker";
import Info from "@/pages/Info"

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard-admin/:id',
    name: 'DashboardAdmin',
    component: DashboardAdmin
  },
  {
    path: '/dashboard-manager/:id',
    name: 'DashboardManager',
    component: DashboardManager
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/dashboard-worker/:id',
    name: 'DashboardWorker',
    component: DashboardWorker
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
