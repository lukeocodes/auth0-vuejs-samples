import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Callback from "./components/Callback.vue";
import auth from "./authService";

Vue.use(Router);

export default new Router({
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
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (!auth.isAuthenticated()) {
          auth.login({
            target: "/profile"
          });
        } else {
          next();
        }
      }
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    }
  ]
});
