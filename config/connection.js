const mysql2 = require('mysql2');
const chalk = require('chalk');

connection = mysql2.createConnection( {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'employees_db',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.log(chalk.white.bgRed(err));
        return;
    }

    console.log(chalk.bold.bgGreen.black('WELCOME TO EMPLOYEE TRACKER!!'));
})

module.exports = connection;