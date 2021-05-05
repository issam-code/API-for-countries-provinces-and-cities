<template>
  <div class="home">
    <Login :msg="msg" @verify="verify($event)" />
  </div>
</template>

<script>
import Login from '../components/auth.vue';
export default {
  name: "login",
  components: {
    Login
  },
  data(){
    return{
      msg : "",
    }
  },
  methods : {
    verify : async function(user){
      this.$store.dispatch('login',user)
      .then((reponse) => {
          localStorage.setItem("token", reponse.data);
          this.$store.state.token = reponse.data;
          this.$router.push("Countries");

        })
        .catch((error) => {
          this.msg = error.response.data;
          console.log(error);
        }); 
     
    }
  }
};
</script>