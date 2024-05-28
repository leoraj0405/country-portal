var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root1234@',
    database: 'mydb'
})

router.get('/', function (req, res) {
    try {
        con.query('select * from state', function (error, stateRes) {
            if (error) {
                res.status(409).send("Table not exist")
            } else {
                res.status(200).send(stateRes)
            }
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/:stateId', function (req, res) {
    console.log('state')
    const id = req.params.stateId;
    try {
        con.query('select * from state where id = ?', [id], function (error, result) {
            if (error) {
                res.send(error)
            }
            res.status(200).send(result[0])

        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/country/:id', function (req, res) {
    console.log('country')
    const id = req.params.id;
    try {
        con.query('select * from state where countryId = ?', [id], function (error, result) {
            if (error) {
                res.send(error)
            }
            res.status(200).send(result)

        })
    } catch (error) {
        console.error(error)
    }
})
router.post('/', (req, res) => {
    const {
        countryId,
        stateName,
    } = req.body;
    try {
        sqlQuery = 'insert into state (countryId,stateName) values(?,?)'
        con.query(sqlQuery, [countryId, stateName], (err, result) => {
            if (err) {
                res.status(409).send("Already existing Data or Duplicate Entry")
            } else {
                res.status(200).send("Insert Successfully")
            }
        })
    }
    catch (error) {
        console.error(error)
    }
})

router.put('/:stateId', (req, res) => {
    const id = req.params.stateId;
    try {
        const {
            countryId,
            stateName,
        } = req.body;
        con.query('UPDATE state SET countryId = ?, stateName = ? WHERE id = ? ', [countryId,stateName,id], (err, result) => {
            con.query('select *  from state where id = ?', [id], (err2, resultData) => {
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

router.delete('/countryDel/:countryid', (req, res) => {
    const id = req.params.countryid;
    try {
        con.query('DELETE FROM state WHERE countryId = ?', [id], (err, result) => {
            if(result.affectedRows === 0) {
                res.send("Invalid State Id ")
            }
            else{
                res.status(200).send('Row Deleted')
            }  
        })
    } catch (error) {
        console.error(error)
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    try {
        con.query('DELETE FROM state WHERE id = ?', [id], (err, result) => {
            if(result.affectedRows === 0) {
                res.send("Invalid State Id ")
            }
            else{
                res.status(200).send('Row Deleted')
            }  
        })
    } catch (error) {
        console.error(error)
    }
})



module.exports = router;