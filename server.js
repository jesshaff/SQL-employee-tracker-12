const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const chalk = require('chalk');
const connection = require('./config/connection');
const consoleTable = require('console.table')

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
})
.then((answer) => {

    // Switch case depending on user option
    switch (answer.action) {
        case 'View all employees':
            viewAllEmp();
            break;
        
        case 'View all employees by department':
            viewAllEmpByDept();
            break;
        
        case 'View all employees by role':
            viewAllEmpByRole();
            break;

        case 'Add employee':
            addEmp();
            break;
        
        case 'Add department':
            addDept();
            break;
        
        case 'Add role':
            addRole();
            break;

        case 'Update employee role':
            updateEmpRole();
            break;

        case 'Update employee manager':
            updateEmpMan();
            break;

        case 'View all employees by manager':
            viewAllEmpByMan();
            break;

        case 'Delete employee':
            deleteEmp();
            break;

        case 'Delete role':
            deleteRole();
            break;

        case 'Delete department':
            deleteDep();
            break;
    }
});

// View all employees in the database
function viewAllEmp() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All employees:', res);
    })
};