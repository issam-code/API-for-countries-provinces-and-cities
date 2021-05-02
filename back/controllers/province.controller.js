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
         var province;
         if(req.query.name_province){
            province = await Province.findOne({name : req.query.name_province , country : country._id})
            if(!province){res.send("There are no province with this name !")}
         }else{
            province = await Province.find({country : country._id})
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
            res.send( "There is no country with this name" )
         }
         if (req.body.length > 0){
            const a=[];
            const b=[];
            for (let i = 0; i < req.body.length; i++) {
               const e = req.body[i];
               const pr = await Province.findOne({name : e.name});
               if(pr){
                  a.push( pr.name );
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
                  b.push(req.body[i].name);
               }
               
            }
            res.send("Added Provinces : " + b + " \nExists Provinces : " + a );
           }
          else{
           res.send("body not existed!") 
          }
         
      } catch (error) {
         res.status(500).json({error: error})
      }
   }



  static async updateProvince(req,res){
      try {
         const country = await Country.findOne({code : req.params.name});
         if(!country){
            res.send( "There is no country with this code" )
         }
         if(!req.query.id){
            res.send("Enter the id !")
         }
         const province = await Province.findOne({"_id" : req.query.id });
         if( !province){
            res.send("There is no province with this id !");
         }
         const pr = await Province.findOne({name : req.body.name});
         if(pr){
            res.send("'" + pr.name + "'  is already exist !");
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