const mysql = require("mysql")
const dbConfig = require("../config/db.config")

const connection = mysql.createConnection({
host: dbConfig.HOST,
user: dbConfig.USER,
password: dbConfig.PASSWORD,
database: dbConfig.DB
})

connection.connect(error => error ? error : console.log(`CONNECTED TO THE DATABASE!`))

module.exports = connection;
