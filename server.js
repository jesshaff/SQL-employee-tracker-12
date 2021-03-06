const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const chalk = require('chalk');
const consoleTable = require('console.table')
const connection = require('./config/connection');

const viewAllEmployeesQuery = `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
FROM employee e
LEFT JOIN role r 
ON r.id = e.role_id 
LEFT JOIN department d 
ON d.id = r.department_id
LEFT JOIN employee m ON m.id = e.manager_id
ORDER BY e.id;`

// Main menu functions
const startApp = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        loop: false,
        message: 'MAIN MENU',
        choices: [
            'View all employees department and role details',
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'Go back to main menu',
            'Exit the application'
        ]
    })
    .then((answer) => {

        // Switch case depending on user option
        switch (answer.action) {
            case 'View all employees department and role details':
              viewAllEmployeesDeptsAndRoles();
              break;
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
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'Go back to main menu':
                console.log(chalk.green('Returning to main menu'));
                startApp();
                break;
            case 'Exit the application':
              console.log(chalk.red('Exiting the application'));
              connection.end();
              break;
        };
    });
};

// View all employees department and role details
function viewAllEmployeesDeptsAndRoles() {
  connection.query(viewAllEmployeesQuery, function(err, res) {
      if (err) throw err;
      console.log(chalk.green(res.length + ' employees found!'));
      console.table('All employees department and role details:', res);
      startApp();
  })
};

// View all departments in the database
function viewAllDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(chalk.green(res.length + ' departments found!'));
        console.table('All departments:', res);
        startApp();
    })
};


// View all roles in the database
function viewAllRoles () {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(chalk.green(res.length + ' roles found!'));
        console.table('All roles:', res);
        startApp();
    })
};

// View all employees in the database
function viewAllEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(chalk.green(res.length + ' employees found!'));
        console.table('All employees:', res);
        startApp();
    })
};

// Create department 
function createDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'What is the new Department name?',
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
          console.log(chalk.green(`${answer.department_name} department has been added successfully!\n`));
  
          startApp();
        }
      );
    });
  }

// Add a department
function addDepartment() {
    console.log('A new department is being added...');
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

// Create role 
function createRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the new Role title?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the Salary for this role?',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'What is the Department ID for this role?',
    },
  ]).then(function (answer) {
    console.log(chalk.green(answer));

    var roleAddQuery = `INSERT INTO role SET ?`;

    connection.query(
      roleAddQuery,
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department_id,
      },
      function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(chalk.green(`${answer.title} role has been added successfully!\n`));

        startApp();
      }
    );
  });
}

// Add a role
function addRole() {
  console.log('A new role is being added...');
  var roleQuery = 'SELECT * FROM department';

  connection.query(roleQuery, function (err, res) {
    if (err) throw err;

    const availRoles = res.map(({ id, role_name }) => ({
      value: id,
      Role: `${role_name}`,
    }));

    createRole(availRoles);
  });
};

// Create employee 
function createEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the new Employees first name?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the new Employees last name?',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is the role ID for the new Employee?',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'What is the managers ID for the new Employee?',
    },
  ]).then(function (answer) {
    console.log(chalk.green(answer));

    var employeeAddQuery = `INSERT INTO employee SET ?`;

    connection.query(
      employeeAddQuery,
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
        manager_id: answer.manager_id,
      },
      function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(chalk.green(`${answer.first_name} ${answer.last_name} has been added successfully!\n`));

        startApp();
      }
    );
  });
}

// Add an employee
function addEmployee() {
  console.log('A new employee is being added...');
  var employeeQuery = 'SELECT * FROM department';

  connection.query(employeeQuery, function (err, res) {
    if (err) throw err;

    const availEmployees = res.map(({ id, first_name, last_name, role_id, manager_id }) => ({
      value: id,
      first_name: `${first_name}`,
      last_name: `${last_name}`,
      role_id: `${role_id}`,
      manager_id: `${manager_id}`,
    }));

    createEmployee(availEmployees);
  });
};

// Update an employee role
function updateEmployeeRole() {
  selectEmployees();
}

function selectEmployees() {
  console.log(chalk.green('Updating an employee...'));

  var selectEmployeesQuery = `SELECT * FROM employee`;

  connection.query(selectEmployeesQuery, function (err, res) {
    if (err) throw err;

    const employeeList = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    }));

    console.table(res);
    console.log(chalk.green('Select an Employee To Update!\n'));

    selectRole(employeeList);
  });
}


function selectRole(employeeList) {
  console.log(chalk.green('Updating a role...'));

  var selectRolesQuery = `SELECT * FROM role`;
  let roleList;

  connection.query(selectRolesQuery, function (err, res) {
    if (err) throw err;

    roleList = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);
    console.log(chalk.green('Select a role to Update!\n'));

    promptUpdateEmployee(employeeList, roleList);
  });
}

function promptUpdateEmployee(employeeList, roleList) {
  inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Which employee do you want to set with the role?',
      choices: employeeList,
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Which role do you want to update?',
      choices: roleList,
    },
  ]).then(function (answer) {
    var employeeRoleQuery = `UPDATE employee SET role_id = ? WHERE id = ?`;    
    connection.query(
      employeeRoleQuery,
      [answer.role_id, answer.employee_id],
      function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(chalk.green('Employee Role updated!'));

        startApp();
      }
    );    
  });
}

// Delete department
deleteDepartment = () => {
  var deptQuery = `SELECT * FROM department`;
  connection.query(deptQuery, (err, res) => {
    if (err) throw err;

    inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        choices: function() {
          let choiceArray = res.map(choice => choice.department_name);
          return choiceArray;
        },
        message: 'Select a Department to remove:'
      }
    ])
    .then((answer) => {
      connection.query(`DELETE FROM department WHERE ?` , {department_name: answer.department});
      startApp();
    });
  });
};

// Delete role
deleteRole = () => {
  var roleQuery = `SELECT * FROM role`;
  connection.query(roleQuery, (err, res) => {
    if (err) throw err;

    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        choices: function() {
          let choiceArray = res.map(choice => choice.title);
          return choiceArray;
        },
        message: 'Select a Role to remove:'
      }
    ])
    .then((answer) => {
      connection.query(`DELETE FROM role WHERE ?` , {title: answer.role});
      startApp();
    });
  });
};

// Delete employee
deleteEmployee = () => {
  var employeeQuery = `SELECT * FROM employee`;
  connection.query(employeeQuery, (err, res) => {
    if (err) throw err;

    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        choices: function() {
          let choiceArray = res.map(choice => choice.first_name);
          return choiceArray;
        },
        message: 'Select an Employee to remove:'
      }
    ])
    .then((answer) => {
      connection.query(`DELETE FROM employee WHERE ?` , {first_name: answer.employee});
      startApp();
    });
  });
};

startApp();