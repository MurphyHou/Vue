import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible"
//import 'lib-flexible'
import '../src/assets/css/common.css'
import {
  Button
} from 'vant'

Vue.config.productionTip = false;
Vue.use(Button)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");