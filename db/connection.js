const util = require("util");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: 'Yoshi1993!', 
    database: 'employeeDB'
  });

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;