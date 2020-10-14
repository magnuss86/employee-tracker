const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

//connect to database

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Test");
    askQuestions();
});
// ask user questions of what they would like to do
function askQuestions() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "what would you like to do?",
            choices: ["add department", "add role", "add employee", "view department", "view role", "view employees", "update employee roles", "QUIT"]
        }
    ]).then(function (answers) {
        console.log(answers);
        if (answers.choice === "add department") {
            addDepartment();
        }else if (answers.choice === "add role") {
            addRole();
        }else if (answers.choice === "add employee") {
            addEmployee();
        }else if (answers.choice === "update employee roles") {
            updateEmployeeRoles();
        }else if (answers.choice === "view department") {
            viewDepartment();
        }else if (answers.choice === "view role") {
            viewRole();
        }else if (answers.choice === "view employees") {
            viewEmployees();
        }
        else {
            console.log("bye!");
            connection.end();
        }
    })
}
// function that lets user add department
function addDepartment() {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "What is the name of the department you like to add?"
    }).then(function (answers) {
        connection.query("INSERT INTO department SET ?", { name: answers.name }, function (err) {
            if (err) throw err
            askQuestions()
        })
    })

}
// lets user add role       
function addRole() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err

        let depArr = data.map(function (department) {
            return {
                name: department.name,
                value: department.id
            }
        })
         inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of the role you would like to add?"
            }, {
                name: "depname",
                type: "list",
                message: "What is the department of this role??",
                choices: depArr
            }, {
                name: "salary",
                type: "number",
                message: "What is the salary for this role?"
            },
        ]).then(function (response) {
            connection.query("INSERT INTO role SET ?", {
                title: response.title,
                salary: response.salary,
                department_id: response.depname
            }, function (err) {
                if (err) throw err
                askQuestions()
            })
        })

    })
}
//function that lets user add new employees to the employee table
function addEmployee() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err

        let roleArr = data.map(function (department) {
            return {
                name: department.title,
                value: department.id
            }
        })
         inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is your first name?"
            }, {
                name: "lastName",
                type: "input",
                message: "What is your lastname?",
            }, {
                name: "managerId",
                type: "confirm",
                message: "Are they a manager?"
            },
            {
                name: "roleId",
                type: "list",
                message: "What is the role of this employee?",
                choices: roleArr,
            },
        ]).then(function (response) {
            connection.query("INSERT INTO employee SET ?", {
                first_name: response.firstName,
                last_name: response.lastName,
                manager_id: response.managerId,
                role_id: response.roleId
            }, function (err) {
                if (err) throw err
                askQuestions()
            })
        })

    })
}
//function view all departments
function viewDepartment() {
    connection.query("SELECT * FROM employee_trackerDB.department", function (err, data) {
     if (err) throw err 
     console.table(data)
       askQuestions()  
        })
        
    }
//function view all roles
 function viewRole() {
    connection.query("SELECT * FROM employee_trackerDB.role", function (err, data) {
         if (err) throw err 
         console.table(data)
         askQuestions()      
                })
                
    }
//function view all employees
function viewEmployees() {
     connection.query("SELECT * FROM employee_trackerDB.employee", function (err, data) {
        if (err) throw err 
         console.table(data)
         askQuestions()           
                    })
                    
        }
            
        
