<template>
    <div class="login">
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
            <span  class="text-center text-danger"><p >{{msg}}</p> </span>
            <button @click.prevent="verify()" class="btn btn-dark btn-lg btn-block">Sign In</button><br>

        </form>
    </div>
</template>

<script>
export default {
    name : "login",
    props : {
        msg : String,
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