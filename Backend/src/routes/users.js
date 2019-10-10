import express from 'express';
import mysqlConnection  from '../database.js';

const router = express.Router();


// GET all Users
router.get('/user', (req, res) => {
  mysqlConnection.query('SELECT * FROM USER', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An User
router.get('/user/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM USER WHERE ID = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// POST An User by username and password
router.post('/login', (req, res) => {
  const {USER_NAME, PASSWORD} = req.body
  mysqlConnection.query('SELECT * FROM USER WHERE USER_NAME = ? AND PASSWORD = ?', [USER_NAME, PASSWORD], (err, rows, fields) => {
    if (!err && rows.length > 0) {
      res.json({status: '200'});
    } else {
      res.json({status: '500'})
      console.log(err);
    }
  });
});


// DELETE An User
router.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM USER WHERE ID = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: '200'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An User
router.post('/user', (req, res) => {
  const {USER_NAME, EMAIL, COMPANY, PASSWORD, IDENTITY_HASH} = req.body;
  console.log(req.body);
  console.log(USER_NAME, EMAIL, COMPANY, PASSWORD, IDENTITY_HASH);
  const query = 'INSERT INTO USER (USER_NAME, EMAIL, COMPANY, PASSWORD, IDENTITY_HASH) VALUES (?, ?, ?, ?, ?)';
  mysqlConnection.query(query, [USER_NAME, EMAIL, COMPANY, PASSWORD, IDENTITY_HASH], (err, rows, fields) => {
    if(!err) {
      res.json({status: '200'});
    } else {
      console.log(err);
    }
  });
});

router.put('/user/:id', (req, res) => {
  const { USER_NAME, EMAIL, COMPANY, PASSWORD, IDENTITY_HASH } = req.body;
  const { id } = req.params;
  console.log(req.params);
  const query = 'UPDATE USER SET USER_NAME = ?, EMAIL = ?, COMPANY = ?, PASSWORD = ?, IDENTITY_HASH = ? WHERE id = ?';
  var asd = mysqlConnection.query(query, [USER_NAME, EMAIL, COMPANY, PASSWORD, IDENTITY_HASH, id], (err, rows, fields) => {
    if(!err) {
      console.log(rows.affectedRows + " record(s) updated");
      res.json({status: '200'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
