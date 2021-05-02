var roles = ["createCity"]
function ex(){
    var role = roles.filter( e => e == "createCity")
    console.log(role.length);
        if(role.length < 1 ) {
            console.log('Access denied. ');
        }else{
            console.log(role.length);
        }
        
        
}
ex()