const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table")


const connection = mysql.createConnection({
    host: "localhost",
​
    // Your port; if not 3306
    port: 3306,
​
    // Your username
    user: "root",
​
    // Your password
    password: "password",
    database: "employee_trackerDB"
});
​
connection.connect(function (err) {
    if (err) throw err;
    askQuestions();
});

function askQuestions() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "what would you like to do?",
            choices: ["add department", "add role", "add employee", "view department", "view role", "view employees", "update employee roles" "QUIT"]
        }
    ]).then(function (answers) {
        if (answers.choice === "Search by Artist") {
            searchByArtist();
        }else if (answers.choice === "Search by Song") {
            searchBySong();
        }else if (answers.choice === "Search by Year Range") {
            searchByYearRange();
        }else if (answers.choice === "See Multi Track Artists") {
        seeMultiTrackArtists();
    }else {
            console.log("bye!");
            connection.end();
        }
    })
}