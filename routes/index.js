var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* CITUS DATA */
router.post('/citus-insert', function(req, res, next) {
  console.log("citus-insert");
  res.render('index', { title: 'Express' });
});

router.post('/citus-update', function(req, res, next) {
  console.log("citus-update");
  res.render('index', { title: 'Express' });
});

router.post('/citus-delete', function(req, res, next) {
  console.log("citus-delete");
  res.render('index', { title: 'Express' });
});

router.get('/citus-select', function(req, res, next) {
  console.log("citus-select");
  res.render('index', { title: 'Express' });
});


/* POSGRESQL REPLICATION */

router.post('/pg-insert', function(req, res, next) {
  console.log("pg-insert");
  res.render('index', { title: 'Express' });
});

router.post('/pg-update', function(req, res, next) {
  console.log("pg-update");
  res.render('index', { title: 'Express' });
});

router.post('/pg-delete', function(req, res, next) {
  console.log("pg-delete");
  res.render('index', { title: 'Express' });
});

router.get('/pg-select', function(req, res, next) {
  console.log("pg-select");
  res.render('index', { title: 'Express' });
});

module.exports = router;
