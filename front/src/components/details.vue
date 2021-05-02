<template>
    <div class="detail">
        <h5>{{name}}</h5>
        <p>{{age}}</p>
        <p>{{city}}</p>
    </div>
</template>
<script>
export default {
    name : "details",
    props : {
        name : String,
        age : String,
        city : String
    }
}
</script>