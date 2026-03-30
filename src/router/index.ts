import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      // redirect: '/home/echarts',
      meta: { title: "首页" },
      children: [
        {
          path: '/home/about',
          name: 'home-about',
          component: () => import('../views/AboutView.vue'),
          meta: { title: "列表" },

        },
        {
          path: '/home/map',
          name: 'home-map',
          component: () => import('../views/MapView.vue'),
          meta: { title: "地图" },
        }
      ]

    },
  ],
})
// GOOD

let isAuthenticated = false
router.beforeEach((to) => {
  if (!isAuthenticated) {
    const userInfo = sessionStorage.getItem('userInfo')
    if (userInfo) {
      isAuthenticated = true
    }
  }
  if (to.name !== 'Login' && !isAuthenticated) return { name: 'Login' }
  else if (to.name === 'Login' && isAuthenticated) return { name: 'home' }
  else true
})
export default router
