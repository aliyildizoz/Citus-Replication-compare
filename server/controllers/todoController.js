const { performance } = require('perf_hooks');
const { citusPool, pgReplication, pgPool } = require('../db');


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
    await insert(pgPool);
    var t1 = performance.now();
    var count = await getCount(pgPool);

    res.json({ startTime: t0, endTime: t1, resultTime: (t1 - t0), count });
}
const citus_select = async (req, res, next) => {
    var t0 = performance.now();
    await select(pgPool);
    var t1 = performance.now();
    var count = await getCount(pgPool);
    console.log(t1 - t0);
    res.json({ startTime: t0, endTime: t1, resultTime: (t1 - t0), count });
}

//PG
const pg_insert = async (req, res, next) => {
    var t0 = performance.now();
    await insert(pgReplication.masterPool);
    var t1 = performance.now();
    var count = await getCount(pgReplication.slave1Pool);
    res.json({ startTime: t0, endTime: t1, resultTime: (t1 - t0), count });
}
const pg_select = async (req, res, next) => {
    var t0 = performance.now();
    await select(pgReplication.slave1Pool);
    var t1 = performance.now();
    var count = await getCount(pgReplication.slave1Pool);

    res.json({ startTime: t0, endTime: t1, resultTime: (t1 - t0), count });
}



const get = async (req, res, next) => {
    console.log("get")
    var citusCount = await getCount(pgPool);
    var pgCount = await getCount(pgReplication.slave1Pool);

    res.json({ pgCount, citusCount });
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