const inquirer = require('inquirer');
const database = require('./db/index');
const cTable = require('console.table');

const viewAllDepartmentsPrompt = async() => {
    let departments = await viewAllDepartments()
              let choices = departments.map( obj=> {
                  return obj.departmentName
              })
              console.table(departments);
  
              let {department:departmentName} = await inquirer.prompt([
                  {
                      type: "list",
                      message: "Which department are you looking for?",
                      choices,
                      name: "department"
                  }
              ])
  
              departments.every( async obj=> {
                  if (departmentName === obj.departmentName) {
                      let id = obj.id;
                      let data = await viewAllEmployeeByDepartment(id);
                      console.table(data);
                      return false;
                  }
                  return true;
              });
}

const addEmployeePrompt = async() => {
    let managerFilter = (await viewAllEmployees()).filter(obj=> {
        return obj.title.includes('manager') || obj.title.includes('lawyer');
    });
    let choices = managerFilter.map(({first_name,last_name})=> {
        return `${first_name} ${last_name}`;
    })
    console.log('employee add** ', employee);
    let {first,last,role,manager} = await nquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: ["Human Resources", "Sales", "Engineering", "Information Technology", "Accounting", "Legal"],
            name: "role"
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices,
            name: "manager"
        },
    ]);

};

function startPrompt() {
    console.log('starting promt!')
    inquirer.prompt([
      {
          type: "list",
          message: "What would you like to do?",
          choices: ["View All Employees", "View All Employees By Department", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role"],
          name: "start"
      }
    ])
    .then( async({start}) => {
      // Use user feedback for... whatever!!
      console.log('start',start);
      switch(start) {
        case "View All Employees":
            viewAllEmployees().then( employee => {
                console.table(employee)
            });
            break;
        case "View All Employees By Department":
            return viewAllDepartmentsPrompt();
        case "Add Employee":
            return addEmployeePrompt();
        case "Remove Employee":
            break;
        case "Update Employee Role":
            break;
        case "Update Employee Manager":
            break;
        case "View All Roles":
            break;
        case "Add Role":
            break;
        case "Remove Role":
            break;
        default:
            console.log('Answer does not exist');
            break;

      }
      startPrompt();
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}
startPrompt();

function viewAllEmployees () {
return database.findAllEmployees()
}

function viewAllDepartments () {
    return database.findAllDepartments()
}

function viewAllEmployeeByDepartment (id) {
    return database.findAllEmployeesByDepartment(id);
}

function createEmployee () {
    return database.createEmployee();
}





