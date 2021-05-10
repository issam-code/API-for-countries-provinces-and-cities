<template>
    <div class="provinces">
         
        <div class="col-md-7 container" >
            <table id="tab" class="table">
                <thead>
                    <tr>
                        <th scope="col" class="tha">#</th>
                        <th scope="col" class="tha">Name of Province</th>
                        
                    </tr>
                </thead>
                <tbody v-for="(c,i) in this.$store.state.provinces" :key="i">
                    <tr>
                        <td>{{i+1}}</td>
                        <a href="" @click="go_to_city(c.name)"><td >{{c.name}}</td></a>
                        <td><i class="fas fa-edit" @click="name = c.name;id=c._id"  data-toggle="modal" data-target="#update_province"></i></td>
                        <td><i @click="delete_province(c._id)" class="fas fa-trash-alt"></i></td>
                    </tr> 
                </tbody>
            </table>
             <b-pagination
                style="place-content: center;"                
                v-model="page"
                :total-rows=" this.$store.state.size" 
                :per-page="this.$store.state.limit"
                @change="change"
            />
        </div>


        <div class="modal" id="update_province" >
            <div  class="col-md-5 container my-5 " >
                <div class="card">  
                    <div class="card-header text-center">
                            <h3>Update Province</h3>	
                    </div>
                    <div class=" card-body " >
                        <form class="frmm" method="post" @submit.prevent="update_province()" enctype="multipart/form-data">
                            <div class=" form-group">
                                <label></label>
                                <input v-model="name" type="text" class="form-control" placeholder="Name " required>
                            </div>
                            <span  class="text-center text-danger"><p v-html="msg"></p> </span>
                            <div class="card-footer">
                            <button type="submit"   class="btn btn-primary container">Update</button>
                            </div>
                        </form>
                    </div><br>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name : "provinces_list",
    props : {
        msg : String,
    },
    data(){
        return {
            page: 1,
            id  : "",
            name : "",
        }
    },
    
   methods : {
       change(value){
           this.page = value;
            this.$store.state.page = this.page -1 ;
            this.$store.commit('refProvince');
       },
        delete_province : function(id) {
            var result = confirm("Want to delete?");
            if (result) {
                this.$emit('delete_province',id);
            }
        },
        update_province : function(){
            this.$emit('update_province',{id : this.id, name : {name : this.name}});
            
        },
        go_to_city : function(name){
        this.$router.push({ path: `/Countries/${this.$route.params.code}/${name}` })
      }
    },
    
}
</script>