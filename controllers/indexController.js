const { performance } = require('perf_hooks');
const { citusPool, pgReplication } = require('.././db');


const insert = async (pool) => {
    for (let i = 1; i <= 10000; i++) {
        await pool.query(
            "insert into todo (description) values($1) returning *",
            ["todo" + i]
        );
    }
}
// const update = (pool) => {
//     for (let i = 1; i <= 10000; i++) {
//         const todos = await pool.query(
//             "UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *",
//             [description, todo_id]
//         );
//     }
// }
// const remove = (pool) => {
//     for (let i = 1; i <= 10000; i++) {
//         const todos = await pool.query(
//             "Delete from todo WHERE todo_id=$1 RETURNING *",
//             [id]
//         );
//     }
// }
const select = async (pool) => {
    const todos = await pool.query("SELECT * FROM todo");
}
const getCount = async (pool) => (await pool.query("SELECT Count(*) FROM todo")).rows[0].count;
//Citus
const citus_insert = async (req, res, next) => {
    var t0 = performance.now();
    await insert(citusPool);
    var t1 = performance.now();
    var count = await getCount(citusPool);

    res.render("index", { citusStartTime: t0, citusEndTime: t1, citusResultTime: (t1 - t0), citusCount: count });
}
const citus_select = async (req, res, next) => {
    var t0 = performance.now();
    await select(citusPool);
    var t1 = performance.now();
    var count = await getCount(citusPool);

    res.render("index", { startTime: t0, endTime: t1, resultTime: (t1 - t0), citusCount: count });
}

//PG
const pg_insert = async (req, res, next) => {
    var t0 = performance.now();
    await insert(pgReplication.masterPool);
    var t1 = performance.now();
    var count = await getCount(pgReplication.slave1Pool);
    res.render("index", { pgStartTime: t0, pgEndTime: t1, pgResultTime: (t1 - t0) });
}
const pg_select = async (req, res, next) => {
    var t0 = performance.now();
    await select(pgReplication.slave1Pool);
    var t1 = performance.now();
    var count = await getCount(pgReplication.slave1Pool);

    res.render("index", { pgStartTime: t0, pgEndTime: t1, pgResultTime: (t1 - t0), pgCount: count });
}



const get = async (req, res, next) => {

    // var citusCount = await getCount(citusPool);
    var pgCount = await getCount(pgReplication.slave1Pool);

    res.render("index", { pgCount, citusCount:pgCount });
}


module.exports = {
    citus: {
        citus_insert,
        citus_select
    },
    pg: {
        pg_insert,
        pg_select
    },
    get
}