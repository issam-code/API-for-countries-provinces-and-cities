<template>
  <div class="home">
    <acceil @verify="verify($event)" />
  </div>
</template>

<script>
import acceil from '../components/accueil.vue';
export default {
  name: "Home",
  components: {
    acceil
  },
 
  
};
</script>