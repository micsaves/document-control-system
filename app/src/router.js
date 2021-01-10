import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/",
      name: "home",
      component: Home,
      props: true,
    },

    {
      path: "/rules",
      name: "rules",
      component: () => import("./views/AllRules.vue"),
    },
    {
      path: "/modify",
      name: "modify",
      component: () => import("./views/Modify.vue"),
    },
    {
      path: "/newPage/:id",
      name: "newPage",
      component: () => import("./views/Link.vue"),
      // props: {
      //   default: true,
      //   // function mode, more about it below
      //   search: (route) => ({ search: route.query.id }),
      // },
      props: true,
    },
    {
      path: "/statuscounter",
      name: "statuscounter",
      component: () => import("./views/StatusCounter.vue"),
    },
    {
      path: "/JWW",
      name: "jww",
      component: () => import("./views/JWW.vue"),
    },
    {
      path: "/upload",
      name: "upload",
      component: () => import("./views/Upload.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    if (store.state.token!=[]) {
      next();
    } else {
      next("login");
    }
  } else {
    next();
  }
});

export default router;
