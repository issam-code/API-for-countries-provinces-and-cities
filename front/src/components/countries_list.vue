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
                        <td>{{c.name}}</td>
                        <td>{{c.code}}</td>
                        <td>{{c.dialcode}}</td>
                        <td>{{c.curency}}</td>
                    </tr> 
                </tbody>
            </table>
        </div>


    </div>
</template>
<script>
// import store from '../store/index'

export default {
    name : "country",
    props : {
    },
    data(){
        return {
            
        }
    }
    
    
}
</script>