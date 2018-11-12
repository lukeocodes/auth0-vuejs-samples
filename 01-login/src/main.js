import Vue from "vue";
import App from "./App.vue";
import Axios from "./plugins/axios";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(Axios);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
