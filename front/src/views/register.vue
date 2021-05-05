<template>
  <div class="register">
    <register :msg="msg" @add="add($event)" />
  </div>
</template>

<script>
import register from '../components/add_user';
export default {
  name: "Register",
  components: {
    register
  },
  data () {
        return{
            msg : "",
        }
    },
  methods : {
    add : async function(user){
      this.$store.dispatch('add_user',user)
     .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.$store.state.token = res.data.token;
        this.$router.push("Countries")
        })
      .catch( (error) => {
        this.msg = error.response.data;
      });
     
    }
  }
};
</script>