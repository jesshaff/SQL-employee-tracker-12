const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const chalk = require('chalk');
const connection = require('./config/connection');
const { ADDRGETNETWORKPARAMS } = require('dns');
const { allowedNodeEnvironmentFlags } = require('process');

const connectionProperties = connection;

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

// View all employees by department
function viewAllEmpByDept() {

    // Set global array to store department names
    let deptArr = [];

    // Connect to connection.js
    mysql2.createConnection(connection)
    .then((conn) => {

        // Query names of departments
        return conn.query('SELECT name FROM department');
    })
    .then(function(value) {

        // Place all names within departments
        deptQuery = value;
        for (i=0; i < value.length; i++) {
            deptArr.push(value[i].name);
        }
    })
    .then(() => {

        // Prompt user to select department from an array of departments
        inquirer.prompt( {
            name: 'department',
            type: 'list',
            message: 'Which department would you like to search?',
            choices: deptArr
        })
        .then((answer) => {

            // Query all employees depending on selected department
            const query = `SELECT e.id AS ID, e.first_name AS 'First name', e.last_name AS 'Last name', role.title AS Title, department.name AS department, role.salary AS Salary, concat(m.first_name, ' ', m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id WHERE department.name = '${answer.department}' ORDER BY ID ASC`;
            connection.query(query, (err, res) => {
                if (err) return err;

                // Show results in console.table
                console.log('\n');
                console.table(res);

                // Back to main menu
                mainMenu();
            });
        });
    });
};