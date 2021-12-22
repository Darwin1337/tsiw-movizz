import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {BootstrapVue} from "bootstrap-vue"

Vue.config.productionTip = false;
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css' 
import 'bootstrap-vue/dist/bootstrap-vue.css' 
import 'bootstrap/dist/js/bootstrap.js' 
import 'bootstrap-vue/dist/bootstrap-vue.js' 

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
