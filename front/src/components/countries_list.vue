<template>
    <div class="countries">
         
        <div class="col-md-9 container" >
            <table id="tab" class="table">
                <thead>
                    <tr>
                        <th scope="col" class="tha">#</th>
                        <th scope="col" class="tha">Name of Country</th>
                        <th scope="col" class="tha">Code</th>
                        <th scope="col" class="tha">Dialcode</th>
                        <th scope="col" class="tha">Curency</th>
                    </tr>
                </thead>
                <tbody v-for="(c,i) in this.$store.state.countries" :key="i">
                    <tr>
                        <td>{{i+1}}</td>
                        <a href="" @click="go_to_pr(c.code)"><td >{{c.name}}</td></a>
                        <td>{{c.code}}</td>
                        <td>{{c.dialcode}}</td>
                        <td>{{c.curency}}</td>
                        <td><i @click="delete_country(c._id)" class="fas fa-trash-alt"></i></td>
                        <td><i class="fas fa-edit" @click="country = c;id=c._id"  data-toggle="modal" data-target="#update_country"></i></td>
                    </tr> 
                </tbody>
            </table>
        </div>


        <div class="modal" id="update_country" >
            <div  class="col-md-5 container my-5 " >
                <div class="card">  
                    <div class="card-header text-center">
                            <h3>Update Country</h3>	
                    </div>
                    <div class=" card-body " >
                        <form class="frmm" method="post" enctype="multipart/form-data">
                            <div class=" form-group">
                                <label></label>
                                <input v-model="country.name" type="text" class="form-control" placeholder="Name " required>
                            </div>
                             <div class=" form-group">
                                <label></label>
                                <input v-model="country.code" type="text" class="form-control" placeholder="Code " required>
                            </div>
                             <div class=" form-group">
                                <label></label>
                                <input v-model="country.dialcode" type="text" class="form-control" placeholder="Dialcode" required>
                            </div>
                             <div class=" form-group">
                                <label></label>
                                <input v-model="country.curency" type="text" class="form-control" placeholder="Curency" required>
                            </div>
                                <span  class="text-center text-danger"><p v-html="msg"></p> </span>
                            <div class="card-footer">
                            <button type="submit" @click.prevent="update_country()"  class="btn btn-primary container">Update</button>
                            </div>
                        </form>
                    </div><br>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
// import $ from 'jquery';

export default {
    name : "country",
    props : {
        msg : String,
    },
    data(){
        return {
            id  : "",
             country : {
                name : "",
                code : "",
                dialcode : "",
                curency : "",
            },
        }
    },
   methods : {

       
        delete_country : function(id) {
            var result = confirm("Want to delete?");
            if (result) {
                this.$emit('delete_country',id);
            }
        },
        update_country : function(){
            this.$emit('update_country',{id : this.id, country : this.country});
            
        },
         go_to_pr : function(code){
        this.$router.push({ path: `/Countries/${code}` })
      }
    } 
}
</script>