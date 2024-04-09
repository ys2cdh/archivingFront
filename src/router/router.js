import { createWebHistory, createRouter } from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import ArchivingListView from '@/components/ListView'
import ErrorPage from "@/components/ErrorPage"


const routes = [
  { path: '/', component: HelloWorld },
  { path: '/listView', component: ArchivingListView },
  { path : "/:catchAll(.*)", name : "ErrorPage", component : ErrorPage},  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router