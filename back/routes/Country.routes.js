const express = require('express');
const auth = require('../middleware/auth');
const Roles = require('../middleware/roles');
const router = express.Router();
const Country = require('../controllers/country.controller');
const City = require('../controllers/city.controller')
const Province = require('../controllers/province.controller');
const { updateCity } = require('../controllers/city.controller');


router.get('/countries/:page/search?:code', Country.getAllCountries);
router.post('/countries/create',auth,Country.createCountry);
router.delete('/countries/delete?:id',auth,Country.deleteCountry);
router.put('/countries/update?:id',auth,Country.updateCountry);

router.get('/countries/:name/:page/search?:name_province', Province.getAllProvinces);
router.post('/countries/:name/create',auth, Province.createProvince);
router.delete('/countries/:name/delete?:id',auth,Province.deleteProvince);
router.put('/countries/:name/update?:id',auth,Province.updateProvince);

router.get('/countries/:name_c/:name_pr/:page/search?:name_city',City.getAllCities);
router.post('/countries/:name_c/:name_pr/create',auth,City.createCity);
router.delete('/countries/:name_c/:name_pr/delete?:id',auth,City.deleteCity);
router.put('/countries/:name_c/:name_pr/update?:id',auth,City.updateCity);

module.exports=router;