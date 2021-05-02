const { count } = require("../models/City");
const City = require("../models/City");
const Country = require("../models/Country");
const Province = require("../models/Province");

module.exports = class Countries{


   static async getAllCountries(req,res){
      try {
         var country;
         if(req.query.code){
            country = await Country.findOne({code : req.query.code})
            if(!country){res.send("There are no country with this code !")}
         }else{
            country = await Country.find()
         }
         
         country.length < 1 ? res.status(404).send("There are no country published yet!")  : res.json(country);

        } catch (error) {
          res.status(500).json({error: error})
        }
   }

   static async createCountry(req,res){
      try { 
         if (req.body.length > 0){
            const a=[];
            const b=[];
            const c=[];
            for (let i = 0; i < req.body.length; i++) {
               const e = req.body[i];
               const country1 = await Country.findOne({name : e.name});
               const country2 = await Country.findOne({code : e.code});
               if(country1 || country2){
                  if(country1){
                     a.push(country1.name );
                  }
                  if(country2){
                     b.push(country2.code );
                  }
               }else{
                  await Country.insertMany(req.body[i])
                 c.push(req.body[i].name);
               }
            }
            res.send("Added countries : " + c + " \nExists Countries name : " + a + " \nExists Countries code : " + b );
         }else{
           res.send("body not existed!") 
         }
    } catch (error) {
       res.status(500).json({error: error})
    }

   }
  

  static async updateCountry(req,res){
      try {
         if(!req.query.id){
            res.send("Enter the id !")
         }
         var a="",b="";
         const country1 = await Country.findOne({name : req.body.name});
         const country2 = await Country.findOne({code : req.body.code});
         const country = await Country.findOne({"_id" : req.query.id });
         if(country1){
            a=("'" + country1.name + "'  is already exist !");
            req.body.name = country.name
         }
         if(country2){
            b=("'" + country2.code + "'  is already exist !");
            req.body.code = country.code
         }
         if(!country){
            res.send("There is no country with this id !");
         }
         const result = await Country.findByIdAndUpdate(req.query.id, { $set: req.body } , { new : true });
         res.send(a + "\n" + b + "\n" + result);
      } catch (error) {
         res.status(500).send({error: error})
      }
   }

   static async deleteCountry(req,res){
      try {
         if(!req.query.id){
            res.send("Enter the id !")
         }
         const country = await Country.findOne({"_id": req.query.id});
         if(!country){
            res.send( "There is no country with this id")
         }else{
            await City.deleteMany({country : country._id});
            await Province.deleteMany({country : country._id})
            await Country.deleteOne({"_id": country.id})
            res.send(country.name + " is deleted ")
         }
      }catch (error) {
         res.status(500).json({error: error})
      }
   }




   
}