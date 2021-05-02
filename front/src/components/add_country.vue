<template>
    <div class="add_cn">
        <div class="row  " style="padding:10px;   padding-top: 100px;  padding-bottom: 50px;">
            <button type="button" class="btn btn-dark  col-md-2  container" data-toggle="modal" data-target="#add_country">
                Add Country
            </button>
            <input class="form-control col-md-4 container" type="text" id="search" onkeyup="search()" placeholder="Rechercher">
        </div>


        <div class="modal" id="add_country" >
            <div  class="col-md-5 container my-5 " >
                <div class="card">  
                    <div class="card-header text-center">
                            <h3>Add Country</h3>	
                    </div>
                    <div class=" card-body " >
                        <form class="frmm" method="post" enctype="multipart/form-data">
                            <div class=" form-group">
                                <label></label>
                                <input :v-model="country.name" type="text" class="form-control" placeholder="Name " required>
                            </div>
                             <div class=" form-group">
                                <label></label>
                                <input :v-model="country.code" type="text" class="form-control" placeholder="Code " required>
                            </div>
                             <div class=" form-group">
                                <label></label>
                                <input :v-model="country.dialcode" type="text" class="form-control" placeholder="Dialcode" required>
                            </div>
                             <div class=" form-group">
                                <label></label>
                                <input :v-model="country.curency" type="text" class="form-control" placeholder="Curency" required>
                            </div>
                            
                            <div class="card-footer">
                            <button type="submit" @click.prevent="add_country()"  class="btn btn-primary container">Add</button>
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
    name : "add_country",
    props : {
    },
    data(){
        return{
            country : {
                name : null,
                code : null,
                dialcode : null,
                curency : null,
            }
            
        }
    },
    methods : {
        add_country : function() {
            this.$emit('add_country',this.country)
        }
    }
}
</script>