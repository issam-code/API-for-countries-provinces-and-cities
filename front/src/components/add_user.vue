<template>
    <!-- <div class="login">
        <div style="margin-top : 15%" class="card col-md-6 col-sm-11 bg-light container text-center"> 
            <div class="card-title ">
                <h1 >Registre</h1>
            </div>       
            
            <div style="margin-top : 5%">
                <input v-model="name" class="w-75" type="text" placeholder="Name" required>
            </div>
            <div style="margin-top : 5%">
                <input v-model="mail" class="w-75" type="email" placeholder="Email" required>
            </div>
            <div style="margin-top : 5%">
                <input v-model="pass" class="w-75"  type="password" placeholder="Password" required>
            </div>
            <div style="margin-top : 5%">
                <button @click="add()" class="btn btn-success w-25">Register</button>
            </div><br>
        </div>
    </div> -->
     <div class="add_user">
        <form class="col-md-4 col-sm-12 container my-5">
            <h3>Sign Up</h3>

            <div class="form-group">
                <label>Name</label>
                <input v-model="user.name" type="text" class="form-control form-control-lg"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input v-model="user.email" type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="user.password" type="password" class="form-control form-control-lg" />
            </div>

            <button @click.prevent="add()"  class="btn btn-dark btn-lg btn-block">Sign Up</button><br>

            <!-- <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'Login'}">sign in?</router-link>
            </p> -->
        </form>
    </div>
</template>

<script>
export default {
    name : "registre",
    props : {
    },
    data () {
        return{
            user : {
                name : null,
                email : null,
                password : null,
            }
        }
    },
    methods : {
        add : function() {
            this.$emit('add',this.user)
        }
    }
}
</script>