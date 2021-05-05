<template>
    <div class="cities">
         
        <div class="col-md-7 container" >
            <table id="tab" class="table">
                <thead>
                    <tr>
                        <th scope="col" class="tha">#</th>
                        <th scope="col" class="tha">Name of City</th>
                        
                    </tr>
                </thead>
                <tbody v-for="(c,i) in this.$store.state.cities" :key="i">
                    <tr>
                        <td>{{i+1}}</td>
                        <td>{{c.name}}</td>
                        <td><i @click="delete_city(c._id)" class="fas fa-trash-alt"></i></td>
                        <td><i class="fas fa-edit" @click="name = c.name;id=c._id"  data-toggle="modal" data-target="#update_city"></i></td>
                    </tr> 
                </tbody>
            </table>
        </div>


        <div class="modal" id="update_city" >
            <div  class="col-md-5 container my-5 " >
                <div class="card">  
                    <div class="card-header text-center">
                            <h3>Update City</h3>	
                    </div>
                    <div class=" card-body " >
                        <form class="frmm" method="post" enctype="multipart/form-data">
                            <div class=" form-group">
                                <label></label>
                                <input v-model="name" type="text" class="form-control" placeholder="Name " required>
                            </div>
                            <span  class="text-center text-danger"><p v-html="msg"></p> </span>
                            <div class="card-footer">
                            <button type="submit" @click.prevent="update_city()"  class="btn btn-primary container">Update</button>
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
    name : "cities_list",
    props : {
        msg : String,
    },
    data(){
        return {
            id  : "",
            name : "",
        }
    },
   methods : {
        delete_city : function(id) {
            var result = confirm("Want to delete?");
            if (result) {
                this.$emit('delete_city',id);
            }
        },
        update_city : function(){
            this.$emit('update_city',{id : this.id, name : {name : this.name}});
            
        },
    } 
}
</script>