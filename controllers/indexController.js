const {performance} = require('perf_hooks');
const {citusPool,pgReplication} = require('.././db');


const insert = (pool) => {
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
const select = (pool) => {
    const todos = await pool.query("SELECT * FROM todo");
}

const citus_insert = (req, res, next) => {
    var t0 = performance.now();
    insert(citusPool);
    var t1 = performance.now();
    res.render("index", { startTime: t0, endTime: t1, resultTime: (t1-t0) });
}
const citus_select = (req, res, next) => {
    var t0 = performance.now();
    select(citusPool);
    var t1 = performance.now();
    res.render("index", { startTime: t0, endTime: t1, resultTime: (t1-t0) });
}
module.exports = {
    citus: {
        citus_insert,
        citus_select
    }
}