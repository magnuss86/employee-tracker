const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");


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
    }else {
            console.log("bye!");
            connection.end();
        }
    })
}

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

function addRole() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err

        let depArr = data.map(function (department) {
            return {
                name: department.title,
                value: departmentment.id
            }
        })
         inquirer.prompt([
            {
                name: "name",
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
            connection.query("INSERT INTO crew SET ?", {
                name: response.name,
                depname: response.depname,
                salary: response.salary,
                // department_id: answers.depId
            }, function (err) {
                if (err) throw err
                askQuestions()
            })
        })

    })
}

// function addEmployee() {
//     inquirer.prompt([
//         {
//         name: "firstName",
//         type: "input",
//         message: "What is your first name?"
//         },
//         {
//         name: "lastName",
//         type: "input",
//         message: "What is your last name?"
//         },
//         {
//         name: "role",
//         type: "input",
//         message: "What is your role?"   
//         },
//         ]).then(function (answers) {
//         connection.query("INSERT INTO department SET ?", { title: answers.name }, function (err) {
//             if (err) throw err
//             start()
//         })
//     })


// }