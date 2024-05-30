var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root1234@',
    database: 'mydb'
})

con.connect(function (err) {
    if (err) throw err;
    console.log('mysql connected successfully')
})

router.get('/', (req, res) => {
    try {
        con.query(`select * from country`, (err, result) => {
            res.send(result)
        })
    } catch (error) {
        console.error(error)
    }
})

router.post('/', (req, res) => {
    const {
        name,
        code2,
        code3,
        phonecode
    } = req.body;
    try {
        sqlQuery = 'insert into country (name,isoCode2,isoCode3,phoneCode) values(?,?,?,?)'
        con.query(sqlQuery, [name, code2, code3, phonecode], (err, result) => {
            console.log(err)
            if (err) {
                res.status(409).send("Already exist")
            } else {
                res.status(200).send(resultData[0])
            }
        })
    }
    catch (error) {
        console.error(error)
    }
})

router.put('/:countryId', (req, res) => {
    var id = req.params.countryId;
    try {
        const {
            name,
            code2,
            code3,
            phcode
        } = req.body;
        con.query('UPDATE country SET name = ?, isoCode2 = ?,isoCode3 = ?,phoneCode = ? WHERE id = ?', [name, code2, code3, phcode, id], (err, result) => {
            console.log(err)
            con.query('select *  from country where id = ?', [id], (err2, resultData) => {
                if (err) {
                    res.status(409).send(err)
                } else {
                    res.status(200).send(resultData)
                }
            })
        })
    } catch (error) {
        console.error(error)
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    try {
        con.query(`select s.*,c.name from state s join country as c ON c.id = s.countryId where countryId = ${id}`,function (err,result){
            if(result.length != 0){
                res.send("You are not able to delete to this country")
            }else{
                con.query(`DELETE FROM country WHERE id = ${id}`, function(error,result1){
                    if(error){
                        res.send(error)
                    }else{
                        res.send("Row Deleted")
                    }
                })
            }
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/name/', (req, res) => {
    try {
        con.query('select name,id FROM country ', (err, result) => {
            res.send(result)
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        con.query('select * FROM country WHERE id = ?', [id], (err, result) => {
            res.send(result[0])
        })
    } catch (error) {
        console.error(error)
    }
})


module.exports = router;

