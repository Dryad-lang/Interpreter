// Dependencies
var fs = require("fs");
var path = require("path");
var child_process = require("child_process");
var readline = require("readline");

var lexer = require("./src/lexer");
var parser = require("./src/parser");
var interpreter = require("./src/interpreter");

var initProject = require("./oak/oakfunctions").initProject;
var initExtFuncProject = require("./oak/oakfunctions").initExtFuncProject;
var syncExternals = require("./oak/oakfunctions").syncExternals;
var loadExternals = require("./oak/oakfunctions").loadExternals;
var buildProject = require("./oak/oakfunctions").buildProject;

var commands = {
    "init": {
        "help": "Create a new project",
        "args": ["name", "description", "version", "author", "license", "repository"],
        "run": function(x, y) {
        // Ask for project name
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Project name: ", function(name) {
            rl.question("Project description: ", function(description) {
                rl.question("Project version: ", function(version) {
                    rl.question("Project author: ", function(author) {
                        rl.question("Project license: ", function(license) {
                            rl.question("Project repository: ", function(repository) {
                                rl.close();

                                // Create project
                                initProject(process.cwd(), name, description, version, author, license, repository);
                            });
                        });
                    });
                });
            });
        });    
    }},
    "syncmodules": {
        "help": "Sync externals",
        "args": ["path"],
        "run": function(x) {
            try{
                syncExternals(process.cwd());
            }
            catch(err){
                console.log("Error: project not found");
            }
        }
    },
    "build": {
        "help": "Build project",
        "args": [],
        "run": function() {
            try{
                buildProject(process.cwd());
            }
            catch(err){
                console.log("Error: project not found");
            }
        }
    },
    "init-extlib-project": {
        "help": "Create a new external project",
        "args": ["name", "description", "version", "author", "license", "repository"],
        "run": function(x, y) {
        // Ask for project name
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Project name: ", function(name) {
            rl.question("Project description: ", function(description) {
                rl.question("Project version: ", function(version) {
                    rl.question("Project author: ", function(author) {
                        rl.question("Project license: ", function(license) {
                            rl.question("Project repository: ", function(repository) {
                                rl.close();

                                // Create project
                                initExtFuncProject(process.cwd(), name, description, version, author, license, repository);
                            });
                        });
                    });
                });
            });
        })}
    },
}

function consoleMode() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let input = "";
    rl.question("> ", function(answer) {
        if (answer == "exit") {
            rl.close();
            return;
        }

        if (commands[answer] != undefined) {
            commands[answer].run.apply(null, args);
        } else {
            console.log("Error: command not found");
        }
    });
}

// Main
function main() {
    // Console input
    if(!(process.argv.length <= 2) || (process.argv.includes("--noconsole"))){
        console.log(process.argv.length)
        if (process.argv.length < 3) {
            console.log("Usage: node " + process.argv[1].split("/").pop() + " command [args]");
            process.exit();
        }
    
        var command = process.argv[2];
        var args = process.argv.slice(3);
    
        if (commands[command] != undefined) {
            commands[command].run.apply(null, args);
        } else {
            console.log("Error: command not found");
        }
    }
    else {
        consoleMode();
    }
}

main();