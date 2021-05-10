const express = require('express');
const auth = require('../middleware/auth');
const Roles = require('../middleware/roles');
const router = express.Router();
const Country = require('../controllers/country.controller');
const City = require('../controllers/city.controller')
const Province = require('../controllers/province.controller');
const { updateCity } = require('../controllers/city.controller');


router.get('/countries/search', Country.getAllCountries);
router.post('/countries/create',auth,Country.createCountry);
router.delete('/countries/delete',auth,Country.deleteCountry);
router.put('/countries/update',auth,Country.updateCountry);

router.get('/countries/:name/search', Province.getAllProvinces);
router.post('/countries/:name/create',auth, Province.createProvince);
router.delete('/countries/:name/delete',auth,Province.deleteProvince);
router.put('/countries/:name/update',auth,Province.updateProvince);

router.get('/countries/:name_c/:name_pr/search',City.getAllCities);
router.post('/countries/:name_c/:name_pr/create',auth,City.createCity);
router.delete('/countries/:name_c/:name_pr/delete',auth,City.deleteCity);
router.put('/countries/:name_c/:name_pr/update',auth,City.updateCity);

module.exports=router;