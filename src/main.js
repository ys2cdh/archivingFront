import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import vClickOutside from 'click-outside-vue3'

createApp(App).use(router).use(Antd).use(vClickOutside).mount('#app')
