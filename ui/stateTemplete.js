var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const { response } = require('../../../app');

router.get('/', async function (req, res) {
    var url = new URL(`http://localhost:3000/api/state`);
    const response = await fetch(url.href);
    const data = await response.json();
    res.render('pages/countryUi/stateList', { data })
})

router.get('/addState', async function (req, res) {
    res.render('pages/countryUi/addState', { data: {} })
})

router.get('/edit/:stateId/', async function (req, res) {
    var id = req.params.stateId;
    const response = await fetch(`http://localhost:3000/api/state/${id}`);
    const data = await response.json();
    console.log(data)
    res.render('pages/countryUi/addState', { data });
});

module.exports = router;