<template>
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
            <span  class="text-center text-danger"><p>{{msg}}</p> </span>

            <button @click.prevent="add()"  class="btn btn-dark btn-lg btn-block">Sign Up</button><br>

            
        </form>
    </div>
</template>

<script>
export default {
    name : "registre",
    props : {
        msg : String,
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