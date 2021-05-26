<template>
    <div class="add_cn">
        <i style="margin-top: 50px; margin-left: 100px;cursor: pointer;" @click="$router.go(-1)" class="fas fa-arrow-left fa-lg"></i>
        <div class="row  " style="margin: 40px;">
            <button type="button" class="btn btn-dark  col-md-2  container" data-toggle="modal" data-target="#add">
                Add {{name}}
            </button>

            <input class="form-control col-md-3 container" type="text" v-model="code"   :placeholder="'Search by '+type_search">            
        </div>

         <div class="row  " >
             <div class="col-md-2  container" style=" margin-left: 15%;">
                <h6 style="margin-top: 10px;" class="text-secondary">Acceil/{{this.$route.params.code}}/{{this.$route.params.name_pr}}</h6>
            </div>
             
             <div class="col-md-2  container" >
                <b-form-select class="bg-light" @change="change" v-model="$store.state.limit" :options="options"></b-form-select>
            </div>
            
        </div>
        
           
        <br>
        <div class="modal" id="add" >
            <div  class="col-md-5 container my-5  " >
                <div class="card bg-light">  
                    <div class="card-header text-center bg-dark">
                            <h3 class="text-white">Add {{name}}</h3>	
                    </div><br>
                    <b-form-group v-slot="{ ariaDescribedby }" >
                        <div class="text-center">
                            <div class="col-md-10">
                                <div class="row"> 
                                    <div class="col-md-6">
                                        <b-form-radio  v-model="method" :aria-describedby="ariaDescribedby" name="some-radios" value="1">With Form </b-form-radio>
                                    </div>
                                    <div class="col-md-6">
                                        <b-form-radio   v-model="method" :aria-describedby="ariaDescribedby" name="some-radios" value="0">With File</b-form-radio>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-form-group>
                    <div class=" card-body" >
                        <form v-if="name == 'Country'" @submit.prevent="add_country()" class="frmm" method="post" enctype="multipart/form-data">
                           <div v-if="method == 0">
                                <form method="post" >
                                    <div class="row" style=" margin: -8px;">
                                        <div class=" form-group col-md-6">
                                            <label>name</label>
                                            <b-form-select  v-model="colonnes.name" :options="keys_file"></b-form-select>
                                        </div>
                                        <div class=" form-group col-md-6">
                                        <label>code</label>
                                            <b-form-select  v-model="colonnes.code" :options="keys_file"></b-form-select>
                                        </div>
                                    </div>
                                    <div class="row" style="  margin: -8px;">
                                        <div class=" form-group col-md-6">
                                            <label>dialcode</label>
                                            <b-form-select  v-model="colonnes.dialcode" :options="keys_file"></b-form-select>
                                        </div>
                                        <div class=" form-group col-md-6">
                                          <label>curency</label>
                                          <b-form-select  v-model="colonnes.curency" :options="keys_file"></b-form-select>
                                        </div>
                                    </div> 
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
                                    <div class=" form-group col-md-6">
                                        <label>name</label>
                                        <b-form-select  v-model="name_pr" :options="keys_file"></b-form-select>
                                    </div>
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
                                    <div class=" form-group col-md-6">
                                        <label>name</label>
                                        <b-form-select  v-model="name_city" :options="keys_file"></b-form-select>
                                    </div>
                                    <div class="form-group files">
                                        <input  type="file" accept=".xls,.xlsx" @change="readExcel" value="import excel">
                                    </div> 
                                </form>
                            </div>                            
                            <div v-if="method == 1" class=" form-group">
                                <label></label>
                                <input v-model="name_city" type="text" class="form-control" placeholder="Name " required>
                            </div>
                            <span  class="text-center text-danger"><p >{{msg}}</p> </span>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary  container">Add</button>
                            </div>
                        </form>
                    </div><br>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import _ from 'lodash';
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
            keys_file : [],
            options: [5,10,15,20],
            name_file : "",
            method : 1,
            country : {
                name : "",
                code : "",
                dialcode : "",
                curency : "",
            },
            countries : [],
            colonnes : {
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
        
        change(){
            if(this.name == "Country"){
                this.$store.commit('refCountry');
            }
            if(this.name == "Province"){
                this.$store.commit('refProvince');
            }
            if(this.name == "City"){
                this.$store.commit('refCity');
            }
        },
         readExcel(e) {
        const files = e.target.files;
        this.name_file=files[0].name;
        const fileReader = new FileReader(); // construction function that can read the file content
        fileReader.onload = ev => {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {type: "binary" });
            const wsname = workbook.SheetNames[0]; //take the first sheet
            this.tab = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
            this.keys_file = Object.keys(Object.assign(...XLSX.utils.sheet_to_json(workbook.Sheets[wsname])))
        };
        fileReader.readAsBinaryString(files[0]); // read file, trigger onload
        },
        add_country : function() {
            if(this.method == 1){
                if(this.country.name && this.country.code && this.country.dialcode && this.country.curency){
                this.tab.push(this.country);
                this.$emit('add_country',[this.country]);
                    this.country = {
                        name : "",
                        code : "",
                        dialcode : "",
                        curency : "",
                    }
                this.msg = "";
                }
            }else{
                if(this.tab.length == 0 || !this.colonnes.name || !this.colonnes.code || !this.colonnes.dialcode || !this.colonnes.curency){
                    this.msg="choose file and the colonnes !"
                }else{
                    this.tab.forEach(element => {
                        this.countries.push({
                            name : element[this.colonnes.name],
                            code : element[this.colonnes.code],
                            dialcode : element[this.colonnes.dialcode],
                            curency : element[this.colonnes.curency],
                        });
                    });   
                    this.$emit('add_country',this.countries);
                   this.keys_file = []; 
                    this.msg = "";
                }
            }
        },
         add_province : function() {
            if(this.method == 1){
                if(this.name_pr){
                    this.tab.push({name : this.name_pr});
                    this.$emit('add_province',[{name : this.name_pr}]);
                    this.name_pr = "";
                    this.msg = "";
                }
            }else{
                if(this.tab.length == 0 || !this.name_pr){
                    this.msg="choose file and the colonnes !"
                }else{
                    this.tab.forEach(element => {
                        this.countries.push({
                            name : element[this.name_pr],
                        });
                    });   
                    this.$emit('add_province',this.countries);
                    this.keys_file = []; 
                    this.name_pr = "";
                    this.msg = "";
                }
            }
        },
        add_city : function() {
            if(this.method == 1){
                if(this.name_city){
                this.tab.push({name : this.name_city});
                this.$emit('add_city',[{name : this.name_city}]);
                this.name_city="";
                this.msg = "";
            }
            }else{
                if(this.tab.length == 0 || !this.name_city){
                    this.msg="choose file and the colonnes !"
                }else{
                    this.tab.forEach(element => {
                        this.countries.push({
                            name : element[this.name_city],
                        });
                    });   
                    this.$emit('add_city',this.countries);
                    this.keys_file = []; 
                    this.name_city="";
                    this.msg = "";
                }
            }
        },
    },
   watch : {
       code : _.debounce(async function() {
           if(this.name == "Country"){
                this.$store.state.countries = []; 
                this.$store.state.countries = (await axios.get("http://localhost:3000/api/countries/search?code="+this.code+ "&page="+this.$store.state.page)).data.country;
            }
            if(this.name == "Province"){
                this.$store.state.provinces = []; 
                this.$store.state.provinces = (await axios.get("http://localhost:3000/api/countries/" +  this.$route.params.code + "/search?name="+this.code+ "&page="+this.$store.state.page)).data.province;
            }
            if(this.name == "City"){
                this.$store.state.cities = []; 
                this.$store.state.cities = (await axios.get("http://localhost:3000/api/countries/" +  this.$route.params.code + "/" + this.$route.params.name_pr + "/search?name="+this.code + "&page="+this.$store.state.page)).data.city;
            }
       }, 1500),
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