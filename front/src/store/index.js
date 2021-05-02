import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries : [],
    token : localStorage.getItem("token") || '',
  },
  mutations: {
    auth(state, token){
      state.token = token;
    },
    logout(state){
      state.token='';
      localStorage.clear("token");
      router.push("/")
    }
  },
  actions: {
    // async add_country (country) {
    //   let rep = ( await axios.post("http://localhost:3000/api/countries/create", country)).data;
    //   console.log(rep);
    // }
     async add_user ( {}, user) {
      try {
        let reponse = await axios.post("http://localhost:3000/api/users/create", user);
        if(reponse){
          alert("you Logged up");
          router.push("/")
        }else{
          alert("you do not Logged up , try again");        }
      } catch (error) {
        console.log(error);
      }
      
    },
    async login ({commit}, user){
      try {
        let reponse = await axios.post("http://localhost:3000/api/users/login",user);
        if(reponse){
          router.push("Acceil")
          localStorage.setItem("token", reponse.data);
          commit('auth',reponse.data);
          console.log("Logged in \n");
        }else{
          alert("email or password invalid !");
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {},
});
