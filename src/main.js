import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./assets/sass/reset.sass";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.use(require("vue-jalali-moment"));
Vue.moment.locale("fa");
Vue.$cookies.config("7d");
Vue.config.productionTip = false;
window.$ = window.jQuery = require("jquery");

new Vue({
  router,
  store,
  async created() {
    axios.interceptors.request.use(async config => {
      config.headers["scbeta"] = process.env.VUE_APP_SCBETA;
      return config;
    });
  },
  render: h => h(App)
}).$mount("#app");
Vue.use(VueSweetalert2);
