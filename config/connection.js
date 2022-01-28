const mysql2 = require('mysql2');
const chalk = require('chalk');

connection = mysql2.createConnection( {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'employees_db',
    multipleStatements: true
});

// Connects to sql server and sql database
connection.connect((err) => {
    startApp();
    if (err) {
        console.log(chalk.white.bgRed(err));
        return;
    }

    console.log(chalk.bold.green(`
╔═══╗─────╔╗──────────────╔═╗╔═╗
║╔══╝─────║║──────────────║║╚╝║║
║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
───────║║──────╔═╝║─────────────────────╔═╝║
───────╚╝──────╚══╝─────────────────────╚══╝`));
});

module.exports = connection;