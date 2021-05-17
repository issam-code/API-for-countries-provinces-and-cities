import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import {BootstrapVue} from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
