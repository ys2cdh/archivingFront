import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import vClickOutside from 'click-outside-vue3'
import store from './store';


createApp(App).use(router).use(Antd).use(store).use(vClickOutside).mount('#app')
