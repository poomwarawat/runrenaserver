const mysql = require("mysql");
const con = mysql.createConnection({
  host: "35.240.246.198",
  user: "runrena",
  password: "runrena",
  database: "runrena",
});

module.exports = con;
