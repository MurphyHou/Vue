import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Index",
    component: () =>
      import("../views/Index.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import("../views/Home.vue")
  },
  {
    path: "/vuex",
    name: "vuex",
    component: () =>
      import("../views/Vuex.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;