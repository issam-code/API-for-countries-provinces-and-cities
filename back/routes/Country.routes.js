const express = require('express');
const auth = require('../middleware/auth');
const Roles = require('../middleware/roles');
const router = express.Router();
const Country = require('../controllers/country.controller');
const City = require('../controllers/city.controller')
const Province = require('../controllers/province.controller');
const { updateCity } = require('../controllers/city.controller');


router.get('/countries/search?:code', Country.getAllCountries);
router.post('/countries/create',[auth,Roles.createCountry],Country.createCountry);
router.delete('/countries/delete?:id',[auth,Roles.deleteCountry],Country.deleteCountry);
router.put('/countries/update?:id',[auth,Roles.updateCountry],Country.updateCountry);

router.get('/countries/:name/search?:name_province', Province.getAllProvinces);
router.post('/countries/:name/create',[auth,Roles.createProvince], Province.createProvince);
router.delete('/countries/:name/delete?:id',[auth,Roles.deleteProvince],Province.deleteProvince);
router.put('/countries/:name/update?:id',[auth,Roles.updateProvince],Province.updateProvince);

router.get('/countries/:name_c/:name_pr/search?:name_city',City.getAllCities);
router.post('/countries/:name_c/:name_pr/create',[auth,Roles.createCity],City.createCity);
router.delete('/countries/:name_c/:name_pr/delete?:id',[auth,Roles.deleteCity],City.deleteCity);
router.put('/countries/:name_c/:name_pr/update?:id',[auth,Roles.updateCity],City.updateCity);

module.exports=router;