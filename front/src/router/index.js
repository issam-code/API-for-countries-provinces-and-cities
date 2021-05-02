import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Countries from "../views/countries.vue";
import Acceil from "../views/home.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Acceil",
    name: "Acceil",
    component: Acceil,
    
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/Countries",
    name: "Countries",
    component: Countries,
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
