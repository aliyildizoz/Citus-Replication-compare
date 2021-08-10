var express = require('express');
const indexCtrl = require('./../controllers/indexController');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});


/* CITUS DATA */
router.post('/citus-insert', indexCtrl.citus.citus_insert);
router.get('/citus-select', indexCtrl.citus.citus_select);

// router.post('/citus-update', function (req, res, next) {
//   console.log("citus-update");
//   res.render('index', { title: 'Express' });
// });

// router.post('/citus-delete', function (req, res, next) {
//   console.log("citus-delete");
//   res.render('index', { title: 'Express' });
// });




// /* POSGRESQL REPLICATION */

// router.post('/pg-insert', function (req, res, next) {
//   console.log("pg-insert");
//   res.render('index', { title: 'Express' });
// });

// router.post('/pg-update', function (req, res, next) {
//   console.log("pg-update");
//   res.render('index', { title: 'Express' });
// });

// router.post('/pg-delete', function (req, res, next) {
//   console.log("pg-delete");
//   res.render('index', { title: 'Express' });
// });

// router.get('/pg-select', function (req, res, next) {
//   console.log("pg-select");
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
