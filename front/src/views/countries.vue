<template>
<div class="countries">
    <add_country @add_country="add_country($event)"/>
    <countries_list  />
</div>
</template>
<script>
import axios from 'axios';
// import store from '../store/index'
import countries_list from "../components/countries_list";
import add_country from "../components/add_country";
export default {
    name : "countries",
    components :{
        countries_list,
        add_country,
    },
   
    async created () {
         this.$store.state.countries = (await axios.get("http://localhost:3000/api/countries/search")).data;
    },
    methods : {
    add_country : async function(country){
      await axios.post("http://localhost:3000/api/countries/create",country)
      .then((response) => {
        // this.$router.push({name : "Acceil"});
        // this.$router.push({ path: `/Acceil` })
        localStorage.setItem("jwt", response.data);
        alert("country added !")
      })
      .catch((errors) => {
        alert("try again !")
        console.log("Cannot add country\n"+errors)
      });
    // this.$store.dispatch('add_country',country);
    }
  }
}
</script>