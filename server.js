const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const chalk = require('chalk');
const consoleTable = require('console.table')
const connection = require('./config/connection');

// Main menu functions
const startApp = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        loop: false,
        message: 'MAIN MENU',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Go back to main menu'
        ]
    })
    .then((answer) => {

        // Switch case depending on user option
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Go back to main menu':
                console.log('Returning to main menu');
                connection.end();
                break;
        };
    });
};

// View all departments in the database
function viewAllDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' departments found!');
        console.table('All departments:', res);
        startApp();
    })
};


// View all roles in the database
function viewAllRoles () {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' roles found!');
        console.table('All roles:', res);
        startApp();
    })
};

// View all employees in the database
function viewAllEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All employees:', res);
        startApp();
    })
};

// Create department 
function createDepartment() {
    inquirer.prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the new Department Name?",
      },
    ]).then(function (answer) {
      console.log(answer);
  
      var deptAddQuery = `INSERT INTO department SET ?`;
  
      connection.query(
        deptAddQuery,
        {
          department_name: answer.department_name,
        },
        function (err, res) {
          if (err) throw err;
  
          console.table(res);
          console.log("Inserted successfully!\n");
  
          startApp();
        }
      );
    });
  }

// Add a department
function addDepartment() {
    console.log('A department is being added...');
    var deptQuery = 'SELECT * FROM department';
  
    connection.query(deptQuery, function (err, res) {
      if (err) throw err;
  
      const availDepartments = res.map(({ id, department_name }) => ({
        value: id,
        Department: `${department_name}`,
      }));
  
      createDepartment(availDepartments);
    });
  };

startApp();