import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import PopupCallback from "./components/Callback.vue";
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
        console.log(to, from);
        if (!auth.isAuthenticated()) {
          next({ path: "/" });
          auth.login();
        } else {
          next();
        }
      }
    },
    {
      path: "/callback/popup",
      name: "callback-popup",
      component: PopupCallback
    }
  ]
});
