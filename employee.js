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
    startPrompt();
}

const addEmployeePrompt = async() => {
    let id = 0;
    let managerFilter = ( await viewAllEmployees() ).filter(obj=> {
        console.log('obj',obj);
        id = obj.id + 1;
        return obj.title.includes('Manager');
    });
    let managerIds = {};
    let choices = managerFilter.map(({first_name,last_name,id})=> {
        managerIds[`${first_name} ${last_name}`] = id;
        return `${first_name} ${last_name}`;
    });

    let roleIds = {};
    let roles = (await getAllRoles()).map(({id, title})=> {
        roleIds[title] = id;
        return title
    }); 

    console.log('managerFilter add** ', managerFilter);
    console.log('choices add** ', choices);
    let data = await inquirer.prompt([
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
            choices:roles,
            name: "role"
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices,
            name: "manager"
        },
    ]);
    let manager_id = managerIds[data.manager];
    let role_id = roleIds[data.role];
    let {first:first_name,last:last_name} = data;
    
    await createEmployee({id,first_name,last_name,role_id,manager_id});
    startPrompt();
};

const removeEmployeePrompt = async () => {
    let employee = await viewAllEmployees();
    let employeeIds = {}
    let choices = employee.map(({first_name,last_name,id})=> {
        employeeIds[`${first_name} ${last_name}`] = id;
        return `${first_name} ${last_name}`;
    });
    let data = await inquirer.prompt([
        {
            type: "list",
            message: "Who do you want to remove?",
            choices, 
            name: "remove"
        }
    ]);
    let employeeId = employeeIds[data.remove];
    removeEmployee(employeeId);
    startPrompt();
}

// Bring back to main menu
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
    console.log('start',start)
      switch(start) {
        case "View All Employees":
            viewAllEmployees().then( employee => {
                console.table(employee)
                startPrompt();
            });
            break;
        case "View All Employees By Department":
            viewAllDepartmentsPrompt();
            
            break;
        case "Add Employee":
            console.log('addding employee')
             addEmployeePrompt();
            //  startPrompt();
             break;
        case "Remove Employee":
            removeEmployeePrompt();
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
    //   startPrompt();
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

function createEmployee (employee) {
    return database.createEmployee(employee);
}

function getAllRoles () {
    return database.findAllRoles();
}

function removeEmployee (employeeId) {
    return database.removeEmployee(employeeId);
}




