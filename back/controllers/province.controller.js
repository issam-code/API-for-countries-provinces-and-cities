const e = require("express");
const City = require("../models/City");
const Country = require("../models/Country");
const Province = require("../models/Province");

module.exports = class Provinces{


   static async getAllProvinces(req,res){
      try {
         const country = await Country.findOne({code : req.params.name})
         if(!country){
            res.status(404).send("There are no country with this name!")
         }
         var province = [];
         var limit = 5;
         var page = req.params.page || 1;
         if(req.query.name_province){
            province[0] = await Province.findOne({name : req.query.name_province , country : country._id})
            if(!province){res.send("There are no province with this name !")}
         }else{
            if(page == "size"){
                province = await Province.find({country : country._id});
               res.json({size : province.length, limit : limit});
            }else{
                province = await Province.find({country : country._id}).skip(page * limit).limit(limit);
            }
         }
         province.length < 1 ? res.status(404).send("There are no province published yet!")  : res.json(province);
         
      } catch (error) {
         res.status(500).json({error: error})
      }
   }


   static async createProvince(req,res){
      try {
         const country = await Country.findOne({code : req.params.name});
         if(!country){
            res.status(404).send( "There is no country with this name" )
         }
         if (req.body.length > 0){
            const a=[];
            const c=[];
            for (let i = 0; i < req.body.length; i++) {
               const e = req.body[i];
               if(!e.name){
                  res.status(404).send("enter name") 
                 }
               
               const pr = await Province.findOne({name : e.name , country : country._id });
               if(pr){
                  a.push(pr.name );
               }else{
                  const p = new Province(req.body[i])
                  const province = await p.save();
                  var provinces = country.provinces;
                  provinces.push(province._id);
                  await Province.updateOne(  {_id : province._id} , {
                     $set: { country : country._id  } },{ new : true}
                  );
                  await Country.updateOne({code : req.params.name}, {
                     $set: { provinces : provinces } },{ new : true}
                  );
                  c.push(req.body[i].name);
               }
               
            }
            if(a.length > 0){
               res.status(404).send(a + " : name is already exist" );
            }
          
            if(c.length > 0){
               res.send(c+ " is Added" );
            }
            
         }else{
           res.status(404).send("enter name") 
          }
         
      } catch (error) {
         res.status(500).json({error: error})
      }
   }



  static async updateProvince(req,res){
      try {
         const country = await Country.findOne({code : req.params.name});
         if(!country){
            res.status(404).send( "There is no country with this code" )
         }
         if(!req.query.id){
            res.status(404).send("Enter the id !")
         }
         const province = await Province.findOne({"_id" : req.query.id });
         if( !province){
            res.status(404).send("There is no province with this id !");
         }
         if(!req.body.name){
            res.status(404).send("enter the name!");
         }
         const pr = await Province.findOne({name : req.body.name});
         if(pr  && req.query.id != pr._id){
            res.status(404).send("'" + pr.name + "'  is already exist !");
         }
         const result = await Province.findByIdAndUpdate(req.query.id, { $set: req.body } , { new : true });
         res.json(result);
      } catch (error) {
         res.status(500).send({error: error})
      }
   }


   static async deleteProvince(req,res){
      try {
         const country = await Country.findOne({code : req.params.name});
         if(!country){
            res.send( "There is no country with this code" )
         }
         const province = await Province.findOne({"_id": req.query.id});
         if(!province){
            res.send( "There is no province with this id" )
         }else{
            var provinces = await country.provinces;
            provinces = provinces.filter( e => e != String(province._id))
            await Country.updateOne({ code : req.params.name}, {
               $set: { provinces : provinces } },{ new : true}
            );
            await City.deleteMany({province : province._id})
            await Province.deleteOne({"_id": province.id})
            res.send(province.name + " is deleted" )
         }
      }catch (error) {
         res.status(500).json({error: error})
      }
   }
}