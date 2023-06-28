// Dependencies
var fs = require("fs");
var path = require("path");
var child_process = require("child_process");
var readline = require("readline");

var lexer = require("../src/lexer");
var parser = require("../src/parser");
var interpreter = require("../src/interpreter");

// Init default project
function initProject(currpath, name, description, version, author, license, repository) {
    fs.mkdirSync(currpath + "/" + name);

    var oakjson = {
        "name": name,
        "description": description,
        "version": version,
        "author": author,
        "license": license,
        "repository": repository,
        "main": "src/main.dyd",
        "externals": []
    }

    fs.mkdirSync(currpath + "/" + name + "/src");
    fs.writeFileSync(currpath + "/" + name + "/src/main.dyd", "");
    fs.mkdirSync(currpath + "/" + name + "/oak_modules");
    fs.mkdirSync(currpath + "/" + name + "/oak_modules/externals");
    fs.mkdirSync(currpath + "/" + name + "/oak_modules/oakdata");
    fs.writeFileSync(currpath + "/" + name + "/oak.json", JSON.stringify(oakjson, null, 4));
}

// Init external functions library project
function initExtFuncProject(currpath, name, description, version, author, license, repository) {
    fs.mkdirSync(currpath + "/" + name);

    var oakjson = {
        "name": name,
        "description": description,
        "version": version,
        "author": author,
        "license": license,
        "repository": repository,
        "mainfolder": "functions/",
    }

    fs.mkdirSync(currpath + "/" + name + "/functions");
    fs.mkdirSync(currpath + "/" + name + "/oak_modules");
    
    var exampleFunction = `
    example_external_function_list = [
        {
            "name": "example",
            "run": function(c) {
                console.log("Hello world!");
            }
        }
    ]

    module.exports = example_external_function_list;
    `
    fs.writeFileSync(currpath + "/" + name + "/functions/example.js", exampleFunction);
    fs.writeFileSync(currpath + "/" + name + "/oak.json", JSON.stringify(oakjson, null, 4));

}



// Sync externals 
function syncExternals(currpath) {
    var externalsFolder = currpath + "/oak_modules/externals";
    var externalsFiles = fs.readdirSync(externalsFolder);
    var externals = [];

    for (var i = 0; i < externalsFiles.length; i++) {
        var filename = externalsFiles[i];

        if (path.extname(filename) == ".js") {
            var name = path.basename(filename, ".js");
            externals.push(name);
        }
    }

    console.log(externals);
    var oakjson = require(currpath + "/oak.json");
    oakjson["externals"] = externals;
    fs.writeFileSync(currpath + "/oak.json", JSON.stringify(oakjson, null, 4));
    return externals;
} 

// Load externals
function loadExternals(currpath){
    var externalsFolder = currpath + "/oak_modules/externals";
    var oakjson = require(currpath + "/oak.json");
    var externals = oakjson["externals"];
    var ext = {};

    for (var i = 0; i < externals.length; i++) {
        var filename = externals[i] + ".js";
        var extpath = externalsFolder + "/" + filename;
        var extdata = require(extpath);

        for (var j = 0; j < extdata.length; j++) {
            var name = extdata[j]["name"];
            var func = extdata[j]["run"];
            ext[name] = func;
        }
    }

    return ext;
}

// Build project
function buildProject(currpath) {
    syncExternals(currpath);
    var ext = loadExternals(currpath);

    var oakjson = require(currpath + "/oak.json");

    if (oakjson["main"] != undefined) {
        var mainpath = currpath + "/" + oakjson["main"];
        var content = fs.readFileSync(mainpath, "utf8");
        var lexemes = lexer(content);
        var ast = parser(lexemes);
        interpreter(ast, ext);
    } else {
        console.log("Error: main not found");
    }
}

// Export
module.exports = {
    "initProject": initProject,
    "initExtFuncProject": initExtFuncProject,
    "syncExternals": syncExternals,
    "loadExternals": loadExternals,
    "buildProject": buildProject
}