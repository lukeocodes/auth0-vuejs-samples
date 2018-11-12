import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Callback from "./components/Callback.vue";
import BackendApi from "./views/BackendApi.vue";
import ExternalApi from "./views/ExternalApi.vue";
import auth from "./authService";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/backend-api",
      name: "api_calls",
      component: ApiView
    },
    {
      path: "/backend-api",
      name: "api_calls",
      component: BackendApi
    },
    {
      path: "/external-api",
      component: ExternalApi
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/callback" || auth.isAuthenticated()) {
    return next();
  }

  auth.login({ target: to.path });
});

export default router;
