const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const todoRouter = require("./routes/todo");

//middleware
app.use(cors());
app.use(express.json());


app.use('/api/todos',todoRouter);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
