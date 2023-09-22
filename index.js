const mysql = require('mysql2');
const inquirer = require('inquirer');

// Establish connection
const connection = mysql.createPool({
    host: 'localhost',
    user: 'jackman',
    password: '8380',
    database: 'employee_db',
    waitForConnections: true, // Enable connection pooling
    connectionLimit: 10,
    queueLimit: 0,
});

// Define the function to view departments
async function viewDepartments() {
    try {
        const query = 'SELECT * FROM department';

        // Use await to wait for the query to complete
        const [results, fields] = await connection.promise().query(query);

        // Display the results in a table format
        console.table(results);

        // Call the function to display the main menu again
        mainMenu();
    } catch (err) {
        console.error('Error fetching departments:', err);
    }
}

// Define the main menu function
async function mainMenu() {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What can I do for you?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    // Placeholder for more options
                ],
            },
        ]);

        switch (answer.action) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                // Call function to view all roles
                break;

            case 'View all employees':
                break;
            case 'Add a department':
                break;
            default:
                connection.end(); // Close database connection
                console.log('Until next time!');
        }
    } catch (err) {
        console.error('Error in mainMenu:', err);
    }
}

// Start the main menu
mainMenu();
