var fs = require("fs");
var util = require("util");

var lexer = require("./src/lexer");
var parser = require("./src/parser");
var interpreter = require("./src/interpreter");

"use strict";



// function main() {
//     if (process.argv.length < 3) {
// 	console.log("Usage: node " + process.argv[1].split("/").pop() + " file");
// 	process.exit();
//     }

//     var content = fs.readFileSync(process.argv[2], "utf8");
//     var lexemes = lexer(content);
//     var ast = parser(lexemes);
//     interpreter(ast, externals)
// }

// main();

/*
---------------------------------------------------

        Dryad Programming Language

---------------------------------------------------
*/ 

var commands = {
    "run": {
        "help": "Run a Dryad program",
        "args": ["file"],
        "run": function(x, y) {
            if (x.split(".").pop() != "dyd") {
                console.log("Error: input file must have the .dyd extension");
                process.exit();
            }

            // Run the program~
            var content = fs.readFileSync(x, "utf8");
            var lexemes = lexer(content);
            var ast = parser(lexemes);
            interpreter(ast, y);
        } 
    },
    "help": {
        "help": "Show help",
        "args": [],
        "run": function() {
            console.log("Commands:");
            for (var key in commands) {
                console.log("  " + key + " " + commands[key].args.join(" "));
                console.log("    " + commands[key].help);
            }
        }
    }
}



function main() {
    if (process.argv.length < 3) {
        console.log("Usage: node " + process.argv[1].split("/").pop() + " command [args]");
        process.exit();
    }

    var cmd = process.argv[2];
    var args = process.argv.slice(3);

    if (cmd in commands) {
        commands[cmd].run.apply(null, args);
    } else {
        console.log("Command not found: " + cmd);
    }
}

main();