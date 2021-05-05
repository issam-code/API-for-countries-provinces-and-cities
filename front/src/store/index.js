import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries : [],
    provinces : [],
    cities : [],
    token : localStorage.getItem("token") || '',
  },
  mutations: {
    async refCountry(state){
      state.countries = (await axios.get("http://localhost:3000/api/countries/search")).data;
    },
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
    async add_country (_,country) {
      return await axios.post("http://localhost:3000/api/countries/create",country);
    },
    async update_country (_,c) {
      return await axios.put("http://localhost:3000/api/countries/update?id="+c.id ,c.country)
    },
    async delete_country (_,id) {
      return await axios.delete("http://localhost:3000/api/countries/delete?id="+id)
      
    },
    async add_province (_,pr) {
      return await axios.post("http://localhost:3000/api/countries/" + pr.code  + "/create",pr.name);
    },
    async update_province (_,pr) {
      return await axios.put("http://localhost:3000/api/countries/" + pr.code  + "/update?id="+pr.id ,pr.name)
    },
    async delete_province (_,pr) {
      return await axios.delete("http://localhost:3000/api/countries/" + pr.code  + "/delete?id="+pr.id);
      
    },
    async add_city (_,city) {
      return await axios.post("http://localhost:3000/api/countries/" + city.code  + "/" + city.name_pr + "/create",city.name);
    },
    async update_city (_,city) {
      return await axios.put("http://localhost:3000/api/countries/" + city.code  + "/" + city.name_pr + "/update?id="+city.id ,city.name)
    },
    async delete_city (_,city) {
      return await axios.delete("http://localhost:3000/api/countries/" + city.code  + "/" + city.name_pr + "/delete?id="+city.id);
      
    },
    async add_user (_, user) {
        return await axios.post("http://localhost:3000/api/users/create", user)
      
    },
    async login (_, user){
       return await axios.post("http://localhost:3000/api/users/login",user);
    }
  },
  modules: {},
});
