<template>
  <div id="app">
    <div  class="navbar navbar-light bg-dark col-md-12 col-12 ">
        <router-link class="col-md-6 col-6 text-left "  :to="{ name: '' }" style=" color: white;  text-decoration:none; "><h3 >World Place</h3></router-link>
      <div class="col-md-6 col-6 text-right ">
        <div class="row">
          <router-link v-if="!$store.state.token" style="color: white;  text-decoration:none; " class="col-md-6 col-6" :to="{ name: 'Login' }"><h5 >Sign In</h5></router-link>
          <router-link v-if="!$store.state.token" style="color: white;  text-decoration:none; "  class="col-md-6 col-6"  :to="{ name: 'Register' }"><h5 >Sign Up</h5></router-link>        
        </div>
        <a href=""  class=" text-right"   style="color: white;  text-decoration:none; "><h5 v-if="$store.state.token"  @click="$store.commit('logout')" >Log out</h5></a>        
      </div>
      
       
    </div>
    <router-view />
  </div>
</template>
