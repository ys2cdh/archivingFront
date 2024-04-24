import { createWebHistory, createRouter } from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import ArchivingListView from '@/components/ListView'
import Test from '@/components/testView'
import ErrorPage from "@/components/ErrorPage"
import Login from "@/components/LoginView"


const routes = [
  { path: '/', component: HelloWorld },
  { path: '/listView', component: ArchivingListView },
  { path: '/test', component: Test },
  { path: '/login', component: Login },
  { path : "/:catchAll(.*)", name : "ErrorPage", component : ErrorPage},  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router