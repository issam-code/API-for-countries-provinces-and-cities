<template>
    <div class="login">
        <!-- <div style="margin-top : 12%" class="card col-md-6 col-sm-11 bg-light container text-center">        
            <h1 style="margin-top : 5%">Login</h1>
            <div style="margin-top : 5%">
                <input v-model="mail" class="w-75" type="email" placeholder="Email" required>
            </div>
            <div style="margin-top : 5%">
                <input v-model="pass" class="w-75"  type="password" placeholder="Password" required>
            </div>
            <div style="margin-top : 5%">
                <button @click="verify()" class="btn btn-primary w-25">Login</button>
            </div>
            <div style="margin-top : 5%">
                <button @click="register()" class="btn btn-success w-50">Register</button>
            </div><br>
        </div> -->
        <form class="col-md-4 col-sm-11 container my-5">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input v-model="user.email" type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="user.password" type="password" class="form-control form-control-lg" />
            </div>

            <button @click.prevent="verify()" class="btn btn-dark btn-lg btn-block">Sign In</button><br>

            <!-- <p class="forgot-password text-right">
                Not registered 
                <router-link :to="{name: 'Register'}">sign up?</router-link>
            </p> -->
            

        </form>
    </div>
</template>

<script>
export default {
    name : "login",
    props : {
    },
    data () {
        return{
            user : {
                email : null,
                password : null,
            }
        }
    },
    methods : {
        verify : function() {
            this.$emit('verify',this.user)
        },
        register : function(){
            this.$router.push({ path: `/Register` })
        }
    }
}
</script>