DROP DATABASE IF EXISTS employeeDB
CREATE DATABASE employeeDB
USE employeeDB

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(30)
);

INSERT INTO department (departmentName)
    VALUES
    ("Human Resources"),
    ("Sales"),
    ("Engineering"),
    ("Information Technology"),
    ("Accounting"),
    ("Legal");

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INTEGER
);

INSERT INTO role (title, salary, department_id)
    VALUES
    ("Human Resources Manager", 12312332, 1),
    ("Human Resources Recuiter", 13131, 1),
    ("Sales Manager", 213123, 2),
    ("Sales Associate", 123123, 2),
    ("Engineer Manager", 1231241, 3),
    ("Engineer", 1231241, 3),
    ("Information Technology Manager", 1231241, 4),
    ("Information Technology Support", 1231241, 4),
    ("Accounting Manager", 1231241, 5),
    ("Accountant", 1231241, 5),
    ("Legal Manager", 1231241, 6),
    ("Lawyer", 1231241, 6);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
    ("Cody", "Vue", 1, 1),
    ("Annie", "Vue", 2, 2),
    ("Brandon", "Vue", 3, 3),
    ("Anita", "Vue", 4, 4),
    ("Austin", "Vue", 5, 5),
    ("Brian", "Vue", 6, 6);