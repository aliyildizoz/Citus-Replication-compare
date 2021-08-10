const Pool = require("pg").Pool;

const slave1Pool = new Pool({
  user: "postgres",
  password: "my_password",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});


const slave2Pool = new Pool({
  user: "postgres",
  password: "my_password",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});


const masterPool = new Pool({
  user: "postgres",
  password: "my_password",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

const citusPool = new Pool({
  user: "postgres",
  password: "my_password",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = {
  pgReplication: {
    slave1Pool,
    slave2Pool,
    masterPool
  },
  citusPool
};