const mysql2 = require('mysql2');
const chalk = require('chalk');

connection = mysql2.createConnection( {
    host: 'localhost',
    port: 3306,
    user: 'root',
    databasee: 'employees_db',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.log(chalk.white.bgRed(err));
        return;
    }

    console.log(chalk.green(`Connected to DB!!`));
})

module.exports = connection;