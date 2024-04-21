import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path:'/',
    component: () => import('../views/layout/default.vue'),
    children: [
      {path:'/', component: () => import('../views/pages/home.vue')},
      {path:'/detail/:id', component: () => import('../views/pages/detail/detail.vue')},
      {path:'/arscene/:id', component: () => import('../views/pages/arscene.vue')},
      {path:'/list', component: () => import('../views/pages/list.vue')}
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router