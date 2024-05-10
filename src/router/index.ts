import { createRouter, createWebHistory} from 'vue-router'
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
  },
  {
    path:'/admin',
    component: () => import('../views/layout/admin.vue'),
    beforeEnter: (to:object, from:object, next:any) => {
      // 检查用户是否已经登录
      console.log("to",to,"form",from, "next",next);
      
      if (localStorage.getItem('user')) {
        // 如果用户未登录，则跳转到登录页面
        next('/login')
      } else {
        next()
        
      }
    },
    children: [
      {path:'/admin/',component: () => import('../views/pages/admin/index.vue')},
    ]
    
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router