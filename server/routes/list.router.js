const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...

router.get('/', (req, res) => {
    const sqlQueryText = `SELECT * FROM groceries ORDER BY purchased, item;`;
    pool.query(sqlQueryText)
        .then(result => {
            res.send(result.rows);
            console.log('this is result rows', result.rows)
        })
        .catch(err => {
            console.log('Error making GET request to database', error);
            res.sendStatus(500);
        })
}) 

router.post('/', (req, res) => {
    const newGrocery = req.body
    const sqlText = `INSERT INTO "groceries" ("item", "quantity", "unit") VALUES ($1, $2, $3);`
    pool.query(sqlText, [newGrocery.item, newGrocery.quantity, newGrocery.unit])
        .then((result) => {
            console.log('Added new grocery to the database ->', newGrocery)
            res.sendStatus(201)
        }).catch((error) => {
            console.log('Error in server POST', error)
            res.sendStatus(500)
        })
})

router.put('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('PUT purchase request for id', reqId);
    let sqlText = 'UPDATE groceries SET purchased = True WHERE id=$1;'
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Grocery Item Updated to Purchased', reqId);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error updating database: ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})

router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = 'DELETE FROM groceries WHERE id=$1;';
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Grocery Item deleted', reqId);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})

module.exports = router; 