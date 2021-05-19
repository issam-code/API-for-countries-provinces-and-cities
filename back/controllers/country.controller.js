const { count } = require("../models/City");
const City = require("../models/City");
const Country = require("../models/Country");
const Province = require("../models/Province");

module.exports = class Countries{


   static async getAllCountries(req,res){
      try {
         var country = [];
         var size = 0;
         var limit = parseInt(req.query.limit) || 5;
         var page = parseInt(req.query.page) || 0;
         if(req.query.code){
            country[0] = await Country.findOne({code : req.query.code})
            if(!country){res.send("There are no country with this code !")}
         }else{
                  size =( await Country.find()).length;
                  country = await Country.find().skip(page * limit).limit(limit);
            
         }
         
         country.length < 1 ? res.status(404).send("There are no country published yet!")  : res.json({country : country,size : size});

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
               if(!e.name || !e.code || !e.dialcode || !e.curency){
                  res.status(404).send("enter informations of country !") 
               }
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
            if(a.length > 0){
               res.status(404).send(a + " : name is already exist" );
            }
            if(b.length > 0){
               res.status(404).send(b + " : code is already exist" );
            }
            if(c.length > 0){
               res.send(c+ " is Added" );
            }
         }else{
           res.status(404).send("enter informations of country !");
         }
    } catch (error) {
       res.status(500).json({error: error})
    }

   }
  

  static async updateCountry(req,res){
      try {
         if(!req.query.id){
            res.status(404).send("Enter the id !")
         }
         if(!req.body.name){
            res.status(404).send("Enter the name !")
         }
         if(!req.body.code){
            res.status(404).send("Enter the code !")
         }
         if(!req.body.dialcode){
            res.status(404).send("Enter the dialcode !")
         }
         if(!req.body.curency){
            res.status(404).send("Enter the curency !")
         }
         var msg="";
         const country1 = await Country.findOne({name : req.body.name});
         const country2 = await Country.findOne({code : req.body.code});
         const country = await Country.findOne({"_id" : req.query.id });
         if(country1 && req.query.id != country1._id ){
            msg +="name : " + country1.name + " already exist ! <br> ";
            req.body.name = country.name
         }
         if(country2 && req.query.id != country2._id){
            msg += "code : " + country2.code + " already exist !\n"
            req.body.code = country.code
         }
         if(!country){
            res.status(404).send("There is no country with this id !");
         }
         const result = await Country.findByIdAndUpdate(req.query.id, { $set: req.body } , { new : true });
         if(msg){
            res.status(404).send(msg );
         }
         res.send(result);

      } catch (error) {
         res.status(500).send({error: error})
      }
   }

   static async deleteCountry(req,res){
      try {
         if(!req.query.id){
            res.status(404).send("Enter the id !")
         }
         const country = await Country.findOne({"_id": req.query.id});
         if(!country){
            res.status(404).send( "There is no country with this id")
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

   static async add(req,res){      
      const data = require('../data.json');
      try {
          const country = await Country.findOne({code : data[0].iso2});
          if(!country){
             res.status(404).send( "There is no country with this code" )
          }
          var provinces=[];
          var cities = [];
          var name ="";
          for(let i = 0 ; i<data.length ; i++){
            name=data[i].admin_name;
            let a=0;
            provinces.forEach(element => {
               if(name == element.name){
                  a++;
               }
            });
            if(a == 0 ){
               for(let j = 0 ; j<data.length ; j++){
                  if(name == data[j].admin_name){
                     cities.push(data[j].city);
                  }
               }
               provinces.push({name : name, cities : cities});
            }
            cities = [];
          }
         //  res.send(provinces);
          if (provinces.length > 0){
             const pr_add=[];
             const pr_not=[];
             const ct_add=[];
             const ct_not=[];
             for (let i = 0; i < provinces.length; i++) {
                const e = provinces[i];
                const pr = await Province.findOne({name : e.name , country : country._id });
                  if(pr){
                      pr_not.push(pr.name );
                  }else{
                      const p = new Province({name : e.name})
                      const province = await p.save();
                      var prs = country.provinces;
                      prs.push(province._id);
                      await Province.updateOne(  {_id : province._id} , {
                          $set: { country : country._id  } },{ new : true}
                      );
                      await Country.updateOne({code : data[0].iso2}, {
                          $set: { provinces : prs } },{ new : true}
                      );
                      if (e.cities.length > 0){
                          for (let i = 0; i < e.cities.length; i++) {
                          const a = e.cities[i];
                          const city1 = await City.findOne({name: a , province : province._id })
                          if(city1){
                              ct_not.push(city1.name );
                          }else{
                              const c = new City({name : a})
                              const city = await c.save();
                              var cts = province.cities;
                              cts.push(city._id);
                              await City.updateOne(  {_id : city._id} , {
                                  $set: { country : country._id , province : province._id } },{ new : true}
                              );
                              await Province.updateOne({name : e.name}, {
                                  $set: { cities : cts } },{ new : true}
                              );
                              ct_add.push(a);
                              }
                          }
                          pr_add.push(e.name);
                      }
                
                  }
              }
              var reponse="";
              if(pr_not.length > 0){
                  reponse += "\nProvinces already exists : " + pr_not ;
              }
             
                if(pr_add.length > 0){
                  reponse +="\nProvinces Added :" + pr_add  ;
              }
              if(ct_not.length > 0){
                  reponse += "\nCities already exists : "  + ct_not ;
              }
             
                if(ct_add.length > 0){
                  reponse +="\nCities Added :" + ct_add  ;
              }
              res.send(reponse);
          }else{
              res.status(404).json("no data !")
          }
          
      }catch (error) {
          console.log(error)
          res.status(500).json({error: error})
      }
      
  }



   
}