const inquirer = require('inquirer');
const database = require('./db/index');
const cTable = require('console.table');


inquirer
  .prompt([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role"],
        name: "start"
    }
  ])
  .then(({start}) => {
    // Use user feedback for... whatever!!
    switch(start) {
        case "View All Employees":
            viewAllEmployees().then( employee => {
                console.table(employee)
            })
            break;
        default:
            console.log('Answer does not exist');
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

  function viewAllEmployees () {
    return database.findAllEmployees()
  }






