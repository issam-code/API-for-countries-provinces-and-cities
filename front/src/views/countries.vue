<template>
<div class="countries">
    <add_country :msg="msg" name="Country" type_search="code" @add_country="add_country($event)"/>
    <countries_list :msg="msg" @update_country="update_country($event)" @delete_country="delete_country($event)" />
</div>
</template>
<script>
import axios from 'axios';
// import store from '../store/index'
import countries_list from "../components/countries_list";
import add_country from "../components/add";
import $ from 'jquery';
export default {
    name : "countries",
    components :{
        countries_list,
        add_country,
    },
   data(){
     return{
       msg : "",
     }
   },
    async created () {
      this.$store.state.countries = (await axios.get("http://localhost:3000/api/countries/search?")).data;
      axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
    },
    methods : {
    add_country :   function(country){
      this.$store.dispatch('add_country',country)
      .then(async (reponse) => {
        $('#add')
            .modal('hide')
            // .find("input")
            // .val('')
            // .end();
        alert(reponse.data);
        this.$store.state.countries = (await axios.get("http://localhost:3000/api/countries/search?")).data;
      })
      .catch((errors) => {
        this.msg = errors.response.data;
      });
      this.msg="";
      
    },
     update_country :  function(country){
      this.$store.dispatch('update_country',country)
      .then(async (response) => {
        alert(response.data.name + " country updated !");
         $('#update_country')
            .modal('hide')
            // .find("input")
            // .val('');
        this.$store.state.countries = (await axios.get("http://localhost:3000/api/countries/search?")).data;
      })
      .catch(async (errors) => {
          this.msg=errors.response.data;
        console.log(errors);
        this.$store.state.countries = (await axios.get("http://localhost:3000/api/countries/search?")).data;
      });
    },
    delete_country  :  function(id){
      this.$store.dispatch('delete_country',id)
      .then( async (reponse) => {
        alert(reponse.data);
        this.$store.state.countries = (await axios.get("http://localhost:3000/api/countries/search?")).data;
      })
      .catch((errors) => {
        alert("try again, country not deleted ! !")
        console.log(errors)
      });
    },
   
  }
}
</script>