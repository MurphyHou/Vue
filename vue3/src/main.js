/*
 * @Author: your name
 * @Date: 2021-04-25 17:57:17
 * @LastEditTime: 2021-05-26 10:50:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3\src\main.js
 */
import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

const app = createApp(App)
app.config.devtools = true;
app.config.globalProperties.$axios = axios;
app.use(store).use(router).mount('#app')