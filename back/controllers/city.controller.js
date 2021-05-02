const City = require("../models/City");
const Country = require("../models/Country");
const Province = require("../models/Province");

module.exports = class Cities{

   static async getAllCities(req,res){
      try {
         const country = await Country.findOne({code : req.params.name_c});
         if(!country){
            res.status(404).send("There are no country with this name!")
            }
         const province = await Province.findOne({name : req.params.name_pr});
         if(!province){
            res.status(404).send("There are no province with this name!")
            }
            var city;
            if(req.query.name_city){
               city = await City.findOne({name : req.query.name_city , country : country._id, province: province._id})
               if(!city){res.send("There are no city with this name !")}
            }else{
               city = await City.find({country : country._id, province: province._id})
            }
            city.length < 1 ? res.status(404).send("There are no province published yet!")  : res.json(city);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }


   static async createCity(req,res){
      try { 
         const country = await Country.findOne({code : req.params.name_c});
         if(!country){
            res.send( "There is no country with this name" )
         }
         const province = await Province.findOne({name : req.params.name_pr});
         if(!province){
            res.send( "There is no province with this name" )
         }
         if (req.body.length > 0){
            const a=[];
            const b=[];
            for (let i = 0; i < req.body.length; i++) {
               const e = req.body[i];
               const city1 = await City.findOne({name: e.name })
               if(city1){
                  a.push(city1.name );
               }else{
                  const c = new City(req.body[i])
                  const city = await c.save();
                  var cities = province.cities;
                  cities.push(city._id);
                  await City.updateOne(  {_id : city._id} , {
                     $set: { country : country._id , province : province._id } },{ new : true}
                  );
                  await Province.updateOne({name : req.params.name_pr}, {
                     $set: { cities : cities } },{ new : true}
                  );
                  b.push(req.body[i].name);
               }
               
            }
            res.send("Added Cities : " + b + " \nExists Cities : " + a );
           }
          else{
           res.send("body not existed!") 
          }
      }catch (error) {
         res.status(500).json({error: error})
      }
   }
    
   static async updateCity(req,res){
      try {
         const country = await Country.findOne({code : req.params.name_c});
         if(!country){
            res.send( "There is no country with this name" )
         }
         const province = await Province.findOne({name : req.params.name_pr});
         if(!province){
            res.send( "There is no province with this name" )
         }
         if(!req.query.id){
            res.send("Enter the id !")
         }
         const ct = await City.findOne({"_id" : req.query.id });
         if( !ct){
            res.send("There is no city with this id !");
         }
         const city = await City.findOne({name : req.body.name});
         if(city){
            res.send("'" + city.name + "'  is already exist !");
         }
         const result = await City.findByIdAndUpdate(req.query.id, { $set: req.body } , { new : true });
         res.json(result);   
      } catch (error) {
         res.status(500).send({error: error})
      }
   }


   static async deleteCity(req,res){
      try {
         const country = await Country.findOne({code : req.params.name_c});
         if(!country){
            res.send( "There is no country with this name" )
         }
         const province = await Province.findOne({name : req.params.name_pr});
         if(!province){
            res.send( "There is no province with this name" )
         }
         const city = await City.findOne({"_id": req.query.id});
         if(!city){
            res.send("There are no city with this name !")
         }
         var cities = await province.cities;
         cities = cities.filter( e => e != String(city._id))
         await Province.updateOne({ name : req.params.name_pr}, {
            $set: { cities : cities } },{ new : true}
         );
         await City.deleteOne({"_id": city.id})
         res.send( city.name + " is deleted" )
      }catch (error) {
         res.status(500).json({error: error})
      }
   }
}