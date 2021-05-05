const User = require("../models/user");
const _ = require('lodash');
var validator = require("email-validator");
var bcrypt = require('bcrypt');

module.exports = class Users{

    static async addUser(req,res){
        try {
            if(!(req.body.name && req.body.email && req.body.password)){
                res.status(400).send("enter your informations");
            }
            if(req.body.name.length < 5 || req.body.password.length < 5){
                res.status(400).send("length of each one most be more than 5");
            }
            if(!validator.validate(req.body.email)){
                res.status(400).send("email not valid !")
            }
            let user = await User.findOne({email : req.body.email}) ;
            if(user) return res.status(400).send("User already registred !");
            user = new User(_.pick(req.body , ['name' , 'email' , 'password','roles']));
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password , salt)
            await user.save();
            const token = user.generateAuthToken();
            res.header("x-auth-token",token).send({user : _.pick(user , ['_id' , 'name' , 'email','roles' ]), token : token})
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error})
        }
    }
    static async Login(req,res){
        try {
            if(!(req.body.email && req.body.password)){
                res.status(400).send("enter your email and password !!")
            }else{
                let user =await User.findOne({email:req.body.email});
                if (!user){
                    res.status(400).send("email or password invalid !!")
                }
                const validPassword = await bcrypt.compare(req.body.password,user.password);
                if (!validPassword) {
                    res.status(400).send("email or password invalid !!")
                }
                const token = user.generateAuthToken();
                res.send(token); 
             } 
        } catch (error) {
            console.log(error);
            res.status(500).json({'error auth': error})
         }
    }
    static async getUser(req,res){
        try {
             const user = await User.findById(req.user._id).select('-password');
            res.send(user);
        } catch (error) {
            res.status(500).json({'error ': error})
        }
       
    }

}