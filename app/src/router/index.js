import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/arrests-by-month',
      name: 'month',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MonthChart.vue'),
    },
    {
      path: '/arrests-by-boro',
      name: 'borough',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BoroChart.vue'),
    },
    {
      path: '/:age',
      name: 'ageData',
      component: () => import('../views/AgeData.vue'),
    },
  ],
})

export default router
