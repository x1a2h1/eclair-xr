import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path:'/',
    component: () => import('../views/layout/default.vue'),
    children: [
      {path:'/', component: () => import('../views/pages/home.vue')},
      {path:'/detail/:id', component: () => import('../views/pages/detail/detail.vue')},
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router