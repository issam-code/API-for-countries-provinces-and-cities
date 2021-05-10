<template>
    <div class="login">
        <form class="col-md-4 col-sm-11 container my-5" @submit.prevent="verify()">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input v-model="user.email" type="email" min="4" class="form-control form-control-lg" required />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="user.password" type="password" class="form-control form-control-lg" required/>
            </div>
            <span  class="text-center text-danger"><p >{{msg}}</p> </span>
            <button  class="btn btn-dark btn-lg btn-block">Sign In</button><br>

        </form>
    </div>
</template>

<script>
import _ from 'lo'
import validator from 'email-validator';
export default {
    name : "login",
    props : {
        msg : String,
    },
    data () {
        return{
            user : {
                email : "",
                password : "",
            }
        }
    },
    methods : {
        verify : function() {
            if(validator.validate(this.user.email)){
                if(this.user.password.length > 4){
                    this.$emit('verify',this.user)
                }else{ this.msg = "password most be > 4"; }
            }else{this.msg = "email invalid";}
        },
        register : function(){
            this.$router.push({ path: `/Register` })
        },
    },
    watch: {
      
    }
}
</script>