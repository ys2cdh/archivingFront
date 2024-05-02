import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store';

import HelloWorld from '@/components/HelloWorld'
import ArchivingListView from '@/components/ListView'
import Test from '@/components/testView'
import ErrorPage from "@/components/ErrorPage"
import Login from "@/components/LoginView"


const routes = [
  { path: '/', component: HelloWorld , meta: { requiresAuth: true } },
  { path: '/hello', component: HelloWorld , meta: { requiresAuth: true } },
  { path: '/listView', component: ArchivingListView },
  { path: '/test', component: Test },
  { path: '/login', component: Login },
  { path : "/:catchAll(.*)", name : "ErrorPage", component : ErrorPage},  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log('router beforeEach  :', store, store.state ,store.state.email);
  const token = localStorage.getItem('user_token')
  if (to.meta.requiresAuth && !store.state.email) {
    next('/login');
  } else {
    next();
  }
});

export default router