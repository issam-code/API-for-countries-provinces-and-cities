<template>
<div class="provinces">
    <add_province :msg="msg" type_search="name" name="Province" @add_province="add_province($event)"/>
    <provinces_list :msg="msg" @update_province="update_province($event)" @delete_province="delete_province($event)"  />
</div>
</template>
<script>

import $ from 'jquery';
import provinces_list from "../components/provinces_list";
import add_province from "../components/add";
export default {
    name : "provinces",
    components :{
        provinces_list,
        add_province,
    },
    data(){
        return{
            msg : "",
        }
    },
   
    async created () {
        this.$store.commit('refProvince');
    },
    methods : {
         add_province :   function(pr){
            this.$store.dispatch('add_province',{name : pr, code : this.$route.params.code} )
            .then(async (reponse) => {
                $('#add')
                    .modal('hide')
                    .find("input")
                    .val('')
                    .end();
                alert(reponse.data);
                this.$store.commit('refProvince');
            })
            .catch((errors) => {
                this.msg = errors.response.data;
            });
            this.msg="";
            
            },
            delete_province  :  function(id){
                this.$store.dispatch('delete_province',{id : id, code : this.$route.params.code} )
                .then( async (reponse) => {
                    alert(reponse.data);
                    this.$store.commit('refProvince');
                })
                .catch((errors) => {
                    alert("try again, province not deleted ! !")
                    console.log(errors)
                });
            },
            update_province :  function(pr){
                this.$store.dispatch('update_province',{id : pr.id, name : pr.name, code : this.$route.params.code })
                .then(async (response) => {
                    alert(response.data.name + " country updated !");
                    $('#update_province')
                        .modal('hide')
                        // .find("input")
                        // .val('');
                    this.$store.commit('refProvince');
                })
                .catch(async (errors) => {
                    this.msg=errors.response.data;
                    console.log(errors);
                    this.$store.commit('refProvince');
                });
                this.msg = "";
            },
   
  }
}
</script>