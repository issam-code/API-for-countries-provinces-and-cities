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
                        <th scope="col" class="tha">Actions</th>                        
                    </tr>
                </thead>
                <tbody v-for="(c,i) in this.$store.state.countries" :key="i">
                    <tr>
                        <td>{{i+1}}</td>
                        <div style="cursor: pointer;color: mediumblue;" @click="go_to_pr(c.code,c.name)"><td >{{c.name}}</td></div>
                        <td>{{c.code}}</td>
                        <td>{{c.dialcode}}</td>
                        <td>{{c.curency}}</td>
                        <td>
                            <i style="cursor: pointer;margin-right : 70px" class="fas fa-edit" @click="country = c;id=c._id"  data-toggle="modal" data-target="#update_country"></i>
                            <i style="cursor: pointer;" @click="delete_country(c._id)" class="fas fa-trash-alt"></i>
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


        <div class="modal" id="update_country" >
            <div  class="col-md-5 container my-5 " >
                <div class="card">  
                    <div class="card-header text-center">
                            <h3>Update Country</h3>	
                    </div>
                    <div class=" card-body " >
                        <form class="frmm" method="post" @submit.prevent="update_country()" enctype="multipart/form-data">
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
    name : "country",
    props : {
        msg : String,
    },
    data(){
        return {
            page: 1,
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
       change(value){
           this.page = value;
            this.$store.state.page = this.page -1 ;
            this.$store.commit('refCountry');
       },
        delete_country : function(id) {
            var result = confirm("Want to delete?");
            if (result) {
                this.$emit('delete_country',id);
            }
        },
        update_country : function(){
            this.$emit('update_country',{id : this.id, country : this.country});
            
        },
        go_to_pr : function(code,name){
            this.$store.state.provinces = [];
            this.$store.state.page = 0;
            this.$store.state.country=name;
            this.$router.push({ path: `/Countries/${code}` });
      }
    },
    
}
</script>