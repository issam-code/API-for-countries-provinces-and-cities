<template>
    <div class="add_cn">
        <div class="row  " style="padding:10px;   padding-top: 100px;  padding-bottom: 50px;">
            <button type="button" class="btn btn-dark  col-md-2  container" data-toggle="modal" data-target="#add">
                Add {{name}}
            </button>
            <input class="form-control col-md-3 container" type="text" v-model="code" @keyup="search()"  :placeholder="'Search by '+type_search">
           
        </div>


        <div class="modal" id="add" >
            <div  class="col-md-5 container my-5 " >
                <div class="card">  
                    <div class="card-header text-center">
                            <h3>Add {{name}}</h3>	
                    </div><br>
                    <b-form-group v-slot="{ ariaDescribedby }" >
                        <div class="text-center">
                            <div class="col-md-10">
                                <div class="row"> 
                                    <div class="col-md-6">
                                        <b-form-radio   v-model="method" :aria-describedby="ariaDescribedby" name="some-radios" value="0">With File</b-form-radio>
                                    </div>
                                    <div class="col-md-6">
                                        <b-form-radio  v-model="method" :aria-describedby="ariaDescribedby" name="some-radios" value="1">With Form </b-form-radio>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-form-group>
                    <div class=" card-body" >
                        <form v-if="name == 'Country'" @submit.prevent="add_country()" class="frmm" method="post" enctype="multipart/form-data">
                            <div v-if="method == 0">
                                <form method="post" >
                                    <div class="form-group files">
                                        <input id="fl"  type="file" accept=".xls,.xlsx" @change="readExcel" value="import excel">
                                    </div> 
                                </form>
                            </div>
                            
                            <div v-if="method == 1">
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
                            </div>
                            <span  class="text-center text-danger"><p >{{msg}}</p> </span>
                            <div class="card-footer">
                            <button type="submit"   class="btn btn-primary container">Add</button>
                            </div>
                        </form>
                        <form v-if="name == 'Province'" @submit.prevent="add_province()" class="frmm" method="post" enctype="multipart/form-data">
                            <div v-if="method == 0">
                                <form method="post" >
                                    <div class="form-group files">
                                        <input  type="file" accept=".xls,.xlsx" @change="readExcel" value="import excel">
                                    </div> 
                                </form>
                            </div>
                            <div v-if="method == 1" class=" form-group">
                                <label></label>
                                <input v-model="name_pr" type="text" class="form-control" placeholder="Name " required>
                            </div>
                                <span  class="text-center text-danger"><p >{{msg}}</p> </span>
                            <div class="card-footer">
                            <button type="submit" class="btn btn-primary container">Add</button>
                            </div>
                        </form>
                         <form v-if="name == 'City'" @submit.prevent="add_city()" class="frmm" method="post" enctype="multipart/form-data">
                            <div v-if="method == 0">
                                <form method="post" >
                                    <div class="form-group files">
                                        <input  type="file" accept=".xls,.xlsx" @change="readExcel" value="import excel">
                                    </div> 
                                </form>
                            </div>                            <div v-if="method == 1" class=" form-group">
                                <label></label>
                                <input v-model="name_city" type="text" class="form-control" placeholder="Name " required>
                            </div>
                                <span  class="text-center text-danger"><p >{{msg}}</p> </span>
                            <div class="card-footer">
                            <button type="submit" class="btn btn-primary container">Add</button>
                            </div>
                        </form>
                    </div><br>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>

  import XLSX from 'xlsx';
import axios from 'axios';
export default {
    name : "add_country",
    props : {
        name : String,
        type_search : String,
        msg : String,
    },
    data(){
        return{
            name_file : "",
            method : 0,
            country : {
                name : "",
                code : "",
                dialcode : "",
                curency : "",
            },
            code : "",
            name_pr : "",
            name_city : "",
            tab : [],
        }
    },
    methods : {
        
         readExcel(e) {
        const files = e.target.files;
        this.name_file=files[0].name;

        const fileReader = new FileReader(); // construction function that can read the file content
        fileReader.onload = ev => {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
                type: "binary" // binary
          });
        const wsname = workbook.SheetNames[0]; //take the first sheet
        this.tab = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
        };
        fileReader.readAsBinaryString(files[0]); // read file, trigger onload
        },
        add_country : function() {
            if(this.method == 1){
                if(this.country.name && this.country.code && this.country.dialcode && this.country.curency){
                this.tab.push(this.country);
                this.$emit('add_country',[this.country]);
                this.msg = "";
                }
            }else{
                if(this.tab.length == 0){
                    this.msg="there is no file !"
                }else{
                    this.$emit('add_country',this.tab);
                    this.msg = "";
                }
                
            }
            
            
        },
        add_province : function() {
            if(this.method == 1){
                if(this.name_pr){
                    this.tab.push({name : this.name_pr});
                    this.$emit('add_province',[{name : this.name_pr}]);
                    this.msg = "";
                }
            }else{
                if(this.tab.length == 0){
                    this.msg="there is no file !"
                }else{
                    this.$emit('add_province',this.tab);
                    this.msg = "";
                }
                
            }
        },
        add_city : function() {
            if(this.method == 1){
                if(this.name_city){
                this.tab.push({name : this.name_city});
                this.$emit('add_city',[{name : this.name_city}]);
                this.msg = "";
            }
            }else{
                if(this.tab.length == 0){
                    this.msg="there is no file !"
                }else{
                    this.$emit('add_city',this.tab);
                    this.msg = "";
                }
            }
           
            
        },
        search : async function(){
            if(this.name == "Country"){
                this.$store.state.countries = []; 
                this.$store.state.countries = (await axios.get("http://localhost:3000/api/countries/" + this.$store.state.page + "/search?code="+this.code)).data;
            }
            if(this.name == "Province"){
                this.$store.state.provinces = []; 
                this.$store.state.provinces = (await axios.get("http://localhost:3000/api/countries/" +  this.$route.params.code + "/" + this.$store.state.page + "/search?name_province="+this.code)).data;
            }
            if(this.name == "City"){
                this.$store.state.cities = []; 
                this.$store.state.cities = (await axios.get("http://localhost:3000/api/countries/" +  this.$route.params.code + "/" + this.$route.params.name_pr + "/"+ this.$store.state.page + "/search?name_city="+this.code)).data;
            }
        }
    }
}
</script>
<style>
.files input {
    outline: 2px dashed #92b0b3;
    outline-offset: -10px;
    -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
    transition: outline-offset .15s ease-in-out, background-color .15s linear;
    padding: 120px 0px 85px 35%;
    text-align: center !important;
    margin: 0;
    width: 100% !important;
}

.files{ position:relative}
.files:after {  pointer-events: none;
    position: absolute;
    top: 60px;
    left: 0;
    width: 50px;
    right: 0;
    height: 56px;
    content:"" ;
    background-image: url(https://image.flaticon.com/icons/png/128/109/109612.png);
    display: block;
    margin: 0 auto;
    background-size: 100%;
    background-repeat: no-repeat;
}

</style>