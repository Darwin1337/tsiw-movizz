import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false;

// Importing the global css file
import "@/assets/css/global.css"
import 'sweetalert2/dist/sweetalert2.min.css';
import './registerServiceWorker'

Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
