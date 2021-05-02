<template>
  <div class="home">
    <Login @verify="verify($event)" />
  </div>
</template>

<script>
import Login from '../components/auth.vue';
export default {
  name: "login",
  components: {
    Login
  },
  methods : {
    verify : async function(user){
      this.$store.dispatch('login',user);
    }
  }
};
</script>