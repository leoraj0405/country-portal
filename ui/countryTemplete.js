var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const { response } = require('../../../app');

router.get('/', async function (req, res) {
    var url = new URL(`http://localhost:3000/api/country`);
    const response = await fetch(url.href);
    const result = await response.json();
    res.render('pages/countryUi/countryList', { result })
})

router.get('/addCountry/', function (req, res) {
    res.render('pages/countryUi/addCountry', { data: {} });
});

router.get('/edit/:countryId/', async function (req, res) {
    var id = req.params.countryId;
    const response = await fetch(`http://localhost:3000/api/country/${id}`);
    const data = await response.json();
    res.render('pages/countryUi/addCountry', { data });
});

router.get('/state/:id/', async function (req, res) {
    var id = req.params.id;
    console.log(id)
    const response = await fetch('http://localhost:3000/api/country/state/'+id);
    const data = await response.json();
    res.render('pages/countryUi/state',{data})
})

module.exports = router;