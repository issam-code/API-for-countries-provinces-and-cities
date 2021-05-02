
module.exports = class Roles {
    static createCountry (req, res , next){
        var role = req.user.roles.filter( e => e == "CreateCountry")
        if(role.length < 1) return res.status(403).send('Access denied. ');
        next();
    }
    static updateCountry (req, res , next){
        var role = req.user.roles.filter( e => e == "updateCountry")
        if(role.length < 1) return res.status(403).send('Access denied. ');
        next();
    }
    static deleteCountry (req, res , next){
        var role = req.user.roles.filter( e => e == "deleteCountry")
        if(role.length < 1) return res.status(403).send('Access denied. ');
        next();
    }
    static createProvince (req, res , next){
        var role = req.user.roles.filter( e => e == "createProvince")
        if(role.length < 1) return res.status(403).send('Access denied. ');
        next();
    }
    static updateProvince (req, res , next){
        var role = req.user.roles.filter( e => e == "updateProvince")
        if(role.length < 1) return res.status(403).send('Access denied. ');
        next();
    }
    static deleteProvince (req, res , next){
        var role = req.user.roles.filter( e => e == "deleteProvince")
        if(role.length < 1) return res.status(403).send('Access denied. ');
        next();
    }
    static createCity (req, res , next){
        var role = req.user.roles.filter( e => e == "createCity")
        if(role.length < 1) return res.status(403).send('Access denied. ');
        next();
    }
    static updateCity (req, res , next){
        var role = req.user.roles.filter( e => e == "updateCity")
        if(role.length < 1) return res.status(403).send('Access denied. ');
        next();
    }
    
    static deleteCity (req, res , next){
        var role = req.user.roles.filter( e => e == "deleteCity")
        if(role.length < 1) return res.status(403).send('Access denied. ');
        next();
    }
}