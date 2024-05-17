import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store';

import HelloWorld from '@/components/HelloWorld'
import ArchivingListView from '@/components/ListView'
import ArchivingListViewNew from '@/components/ListViewNew'
import Test from '@/components/testView'
import ErrorPage from "@/components/ErrorPage"
import Login from "@/components/LoginView"
import InitView from "@/components/InitView"


const routes = [
  { path: '/', component: HelloWorld , meta: { requiresAuth: true } },
  { path: '/hello', component: HelloWorld , meta: { requiresAuth: true } },
  { path: '/listView', component: ArchivingListView , meta:{ requiresAuth: true } },
  { path: '/initView', component: InitView },
  { path: '/listViewNew', component: ArchivingListViewNew  },
  { path: '/test', component: Test },
  { path: '/login', component: Login },
  { path : "/:catchAll(.*)", name : "ErrorPage", component : ErrorPage},  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log('router beforeEach  :', store.state.email);
  const token = localStorage.getItem('user_token')
  if (token==null && to.meta.requiresAuth && !store.state.email) {
    next('/login');
  } else {
    next();
  }
});

export default router