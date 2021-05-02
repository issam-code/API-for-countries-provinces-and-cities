<template>
  <div class="register">
    <register @add="add($event)" />
  </div>
</template>

<script>
import register from '../components/add_user';
export default {
  name: "Register",
  components: {
    register
  },
  methods : {
    add : async function(user){
      this.$store.dispatch('add_user',user);
    }
  }
};
</script>