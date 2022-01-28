const mysql2 = require('mysql2');
const chalk = require('chalk');
const cfonts = require('cfonts');

// Creating connection to mysql2
connection = mysql2.createConnection( {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'employees_db',
    multipleStatements: true
});

// Employee Tracker "Welcome Message"
cfonts.say('Employee Tracker!', {
    font: 'block',                      // define the font face
	align: 'left',                      // define text alignment
	colors: ['white'],                  // define all colors
    gradient: ['cyan', '#A020F0'],      // define your two gradient colors
	background: 'transparent',          // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 1,                   // define letter spacing
	lineHeight: 0,                      // define the line height
	space: true,                        // define if the output text should have empty lines on top and on the bottom
	maxLength: '9',                     // define how many character can be on one line
	independentGradient: true,          // define if you want to recalculate the gradient for each new line
	transitionGradient: true,           // define if this is a transition between colors directly
	env: 'node'                         // define the environment CFonts is being executed in
});

// Connects to sql server and sql database
connection.connect((err) => {
    if (err) {
        console.log(chalk.white.bgRed(err));
        return;
    }
});

module.exports = connection;