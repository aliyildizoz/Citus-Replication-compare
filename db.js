const Pool = require("pg").Pool;

const slave1Pool = new Pool({
  user: "postgres",
  password: "my_password",
  host: "localhost",
  port: 64530,
  database: "postgres",
});


const slave2Pool = new Pool({
  user: "postgres",
  password: "my_password",
  host: "localhost",
  port: 5432,
  database: "postgres",
});


const masterPool = new Pool({
  user: "postgres",
  password: "my_password",
  host: "localhost",
  port: 64529,
  database: "postgres",
});

const citusPool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5500,
  database: "postgres",
});

module.exports = {
  pgReplication: {
    slave1Pool,
    masterPool
  },
  citusPool
};