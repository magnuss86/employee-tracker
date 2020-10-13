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
    // askQuestions();
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
    //     if (answers.choice === "add department") {
    //         addDepartment();
    //     }else if (answers.choice === "add role") {
    //         addRole();
    //     }else if (answers.choice === "add employee") {
    //         addEmployee();
    //     }else if (answers.choice === "update employee roles") {
    //     updateEmployeeRoles();
    // }else {
    //         console.log("bye!");
    //         connection.end();
    //     }
    })
}

