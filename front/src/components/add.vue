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
                    </div>
                    <div class=" card-body " >
                        <form v-if="name == 'Country'" class="frmm" method="post" enctype="multipart/form-data">
                            <input type="file" accept=".xls,.xlsx" @change="readExcel" value="import excel">
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
                                <span  class="text-center text-danger"><p >{{msg}}</p> </span>
                            <div class="card-footer">
                            <button type="submit" @click.prevent="add_country()"  class="btn btn-primary container">Add</button>
                            </div>
                        </form>
                        <form v-if="name == 'Province'" class="frmm" method="post" enctype="multipart/form-data">
                            <input type="file" accept=".xls,.xlsx" @change="readExcel" value="import excel">
                            <div class=" form-group">
                                <label></label>
                                <input v-model="name_pr" type="text" class="form-control" placeholder="Name " required>
                            </div>
                                <span  class="text-center text-danger"><p >{{msg}}</p> </span>
                            <div class="card-footer">
                            <button type="submit" @click.prevent="add_province()"  class="btn btn-primary container">Add</button>
                            </div>
                        </form>
                         <form v-if="name == 'City'" class="frmm" method="post" enctype="multipart/form-data">
                            <input type="file" accept=".xls,.xlsx" @change="readExcel" value="import excel">
                            <div class=" form-group">
                                <label></label>
                                <input v-model="name_city" type="text" class="form-control" placeholder="Name " required>
                            </div>
                                <span  class="text-center text-danger"><p >{{msg}}</p> </span>
                            <div class="card-footer">
                            <button type="submit" @click.prevent="add_city()"  class="btn btn-primary container">Add</button>
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
            if(this.tab.length < 1){
                this.tab.push(this.country);
            }
            this.$emit('add_country',this.tab);
            
        },
        add_province : function() {
            if(this.tab.length < 1){
            this.tab.push({name : this.name_pr});
            }
            this.$emit('add_province',this.tab);
        },
        add_city : function() {
            if(this.tab.length < 1){
                this.tab.push({name : this.name_city});
            }
            this.$emit('add_city',this.tab);
        },
        search : async function(){
            if(this.name == "Country"){
                this.$store.state.countries = []; 
                this.$store.state.countries = (await axios.get("http://localhost:3000/api/countries/search?code="+this.code)).data;
            }
            if(this.name == "Province"){
                this.$store.state.provinces = []; 
                this.$store.state.provinces = (await axios.get("http://localhost:3000/api/countries/" +  this.$route.params.code + "/search?name_province="+this.code)).data;
            }
            if(this.name == "City"){
                this.$store.state.cities = []; 
                this.$store.state.cities = (await axios.get("http://localhost:3000/api/countries/" +  this.$route.params.code + "/" + this.$route.params.name_pr + "/search?name_city="+this.code)).data;
            }
        }
    }
}
</script>