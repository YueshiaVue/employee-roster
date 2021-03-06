const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    // Find all employees with their respective roles and departments to show their info
    findAllEmployees() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.departmentName AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    }
    // Find all employees without their id
    findAllPossibleManagers(employeeId) {
        return this.connection.query("SELECT id, first_name, last_name FROM employee WHERE id != ?", [employeeId]);
      }
    // Create employee
    createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", [employee]);
      }
    // Remove employee
    removeEmployee(employeeId) {
        return this.connection.query("DELETE FROM employee WHERE id = ?", [employeeId]);
      }
    // Update employee
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
      }
    // Update manager
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId]);
      }
    // Find all roles with departments
    findAllRoles() {
        return this.connection.query("SELECT role.id, role.title, department.departmentName AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");
      }
    // Create role
    createRole(role) {
        return this.connection.query("INSERT INTO role SET ?", [role]);
      }
    // Remove role
    removeRole(roleId) {
        return this.connection.query("DELETE FROM role WHERE id = ?", [roleId]);
      }
    // Find all departments with employees and roles and salary
    findAllDepartments() {
        return this.connection.query("SELECT department.id, department.departmentName, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.departmentName");
      }
    // Create department
    createDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", [department]);
      }
    // Remove department
    removeDepartment(departmentId) {
        return this.connection.query("DELETE FROM department WHERE id = ?", [departmentId]);
      }
    // Find all employees by their department
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;", [departmentId]);
      }
    // Find all employees by their manager
    findAllEmployeesByManager(managerId) {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.departmentName AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;", [managerId]);
      }
}

module.exports = new DB(connection);
