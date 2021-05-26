<template>
    <div class="cities">
         
        <div class="col-md-7 container" >
            <table id="tab" class="table">
                <thead>
                    <tr>
                        <th scope="col" class="tha">#</th>
                        <th scope="col" class="tha">Name of City</th>
                        <th scope="col" class="tha">Actions</th>                        
                        
                    </tr>
                </thead>
                <tbody v-for="(c,i) in this.$store.state.cities" :key="i">
                    <tr>
                        <td>{{i+1}}</td>
                        <td>{{c.name}}</td>
                        <td>
                            <i style="cursor: pointer; margin-right : 70px" class="fas fa-edit" @click="name = c.name;id=c._id"  data-toggle="modal" data-target="#update_city"></i>
                            <i style="cursor: pointer;" @click="delete_city(c._id)" class="fas fa-trash-alt"></i>
                        </td>
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


        <div class="modal" id="update_city" >
            <div  class="col-md-5 container my-5 " >
                <div class="card">  
                    <div class="card-header text-center">
                            <h3>Update City</h3>	
                    </div>
                    <div class=" card-body " >
                        <form class="frmm" method="post"  @submit.prevent="update_city()"  enctype="multipart/form-data">
                            <div class=" form-group">
                                <label></label>
                                <input v-model="name" type="text" class="form-control" placeholder="Name " required>
                            </div>
                            <span  class="text-center text-danger"><p v-html="msg"></p> </span>
                            <div class="card-footer">
                            <button type="submit" class="btn btn-primary container">Update</button>
                            </div>
                        </form>
                    </div><br>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
// import axios from "axios";
export default {
    name : "cities_list",
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
            this.$store.commit('refCity');
       },
        delete_city : function(id) {
            var result = confirm("Want to delete?");
            if (result) {
                this.$emit('delete_city',id);
            }
        },
        update_city : function(){
            this.$emit('update_city',{id : this.id, name : {name : this.name}});
            
        },
    },
    computed: {
        // lists () {
        // return items.slice(
        //     (this.page - 1) * this.limit,
        //     this.page * this.limit
        // )
        // },
        // size () {
        //     if(this.page !=  this.$store.state.page){
        //         this.page =  this.$store.state.page;
        //         this.$store.commit('refCity');
        //     }else{}
            
        // }
    },
}
</script>