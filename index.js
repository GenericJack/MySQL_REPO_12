const mysql = require('mysql2');
const inquirer = require('inquirer');

//establish connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'jackman',
    password: '8380',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

//attempt to create functions for options
function viewDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, results) => {
        if (err) throw err;
        //display the results in a table format
        console.table(results);
        //call function to display the main menu again
        mainMenu();
    });
}

function mainMenu() {
    inquirer
        .createPromptModule([
            {
                type: 'list',
                name: 'action',
                message: 'What can I do for you?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    //placeholder for more options
                ],
            },
        ])
        .then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                    case 'View all roles':
                        //call function to view all roles
                        break;

                    case 'View all employees':
                        break;
                    case 'Add a department':
                        break;
                    default:
                        connection.end(); //close database connection
                        console.log('Until next time!');
            }
        });
}
