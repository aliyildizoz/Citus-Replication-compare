var express = require('express');
const indexCtrl = require('../controllers/todoController');
var router = express.Router();

/* GET home page. */
router.get('/', indexCtrl.get);


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

router.post('/pg-insert', indexCtrl.pg.pg_insert);
router.get('/pg-select', indexCtrl.pg.pg_select);

// router.post('/pg-update', function (req, res, next) {
//   console.log("pg-update");
//   res.render('index', { title: 'Express' });
// });

// router.post('/pg-delete', function (req, res, next) {
//   console.log("pg-delete");
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
