import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Countries from "../views/countries.vue";
import Provinces from "../views/provinces.vue";
import Cities from "../views/cities.vue";
import Acceil from "../views/home.vue";
import store from "../store";
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
      beforeEnter: (toolbar, from, next) => {
        if(!store.state.token) {
          next("/");
        } else {
          next();
        }
      }
  },
  {
    path: "/Countries/:code",
    name: "Provinces",
    component: Provinces,
      beforeEnter: (toolbar, from, next) => {
        if(!store.state.token) {
          next("/");
        } else {
          next();
        }
      }
  },
  {
    path: "/Countries/:code/:name_pr",
    name: "Cities",
    component: Cities,
      beforeEnter: (toolbar, from, next) => {
        if(!store.state.token) {
          next("/");
        } else {
          next();
        }
      }
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
