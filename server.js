const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const chalk = require('chalk');
const connection = require('./config/connection');
const promisemysql = require('promise-mysql');

// Main menu functions

inquirer
.prompt( {
    name: 'action',
    type: 'list',
    loop: false,
    message: 'MAIN MENU',
    choices: [
        'View all employees',
        'View all employees by department',
        'view all employees by role',
        'view all employees by manager',
        'Add employee',
        'Add role',
        'Add department',
        'Update employee role',
        'Update employee manager',
        'Delete employee',
        'Delete role',
        'Delete department'
    ]
});
.then((answer) => {

});
