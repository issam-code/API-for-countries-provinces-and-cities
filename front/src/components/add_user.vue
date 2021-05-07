<template>
     <div class="add_user">
        <form class="col-md-4 col-sm-12 container my-5" @submit.prevent="add()" >
            <h3>Sign Up</h3>
            <div class="form-group">
                <label>Name</label>
                <input v-model="user.name" type="text" class="form-control form-control-lg" required/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input v-model="user.email" type="email" class="form-control form-control-lg" required />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="user.password" type="password" class="form-control form-control-lg" required />
            </div>
            <span  class="text-center text-danger"><p>{{msg}}</p> </span>

            <button  class="btn btn-dark btn-lg btn-block">Sign Up</button><br>

            
        </form>
    </div>
</template>

<script>
import validator from 'email-validator';
export default {
    name : "registre",
    props : {
        msg : String,
    },
    data () {
        return{
            user : {
                name : "",
                email : "",
                password : "",
            }
        }
    },
    methods : {
        add : function() {
            if(!validator.validate(this.user.email)){
                this.msg = "email invalid";
            }else{
                if(this.user.password.length < 5){
                    this.msg = "password most be > 4"; 
                }else{
                    if(this.user.name.length < 5){
                        this.msg = "name most be > 4";
                    }else{
                        this.$emit('add',this.user)
                    }
                }
            }
        }
    }
}
</script>