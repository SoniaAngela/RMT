const express = require("express");
const router = express.Router();
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var http = require("http");
const fs = require("fs");
const fse = require("fs-extra");
var cmd = require("node-cmd")
var shell = require("shelljs");
const readline = require("readline");
var jsonfile = require("jsonfile");

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == "object" ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";


var caleTest = "C:/Users/manea/Desktop/Sonia/Licenta/server/rmt/examples/test.rmt";
var caleResult = "C:/Users/manea/Desktop/Sonia/Licenta/server/rmt/examples/result.txt";
var caleResultEx = "C:/Users/manea/Desktop/Sonia/Licenta/server/rmt/examples/result.txt";
var caleMaincode = "C:/Users/manea/Desktop/Sonia/Licenta/server/rmt/examples/maincode.json";
var caleMaincodermt = "C:/Users/manea/Desktop/Sonia/Licenta/server/rmt/examples/maincode.rmt";
var json = {
    name: null,
    id: null,
    children: []
};
var loop, child;

function findObjectById(element, id) {
    if (element.id == id) {
        return element;
    } else if (element.children != null) {
        var i;
        var result = null;
        for (i = 0; result == null && i < element.children.length; i++) {
            result = findObjectById(element.children[i], id);
        }
        return result;
    }
    return null;
}

router.post("/loop", function (req, res) {


    try {
        console.log(__dirname + " 1 ");
        fse.copySync("C:/Users/manea/Desktop/Sonia/Licenta/server/rmt/examples/example1.rmt", "C:/Users/manea/Desktop/Sonia/Licenta/server/rmt/examples/test.rmt")
        console.log(__dirname + " 2 ");

    } catch (err) {
        console.error(err)
    }
    fs.appendFile(caleTest, req.body.loopParam + ";", function (error) {
        loop = findObjectById(json, req.body.loopParam);
        if (json.id == null || loop == null) {
            json.name = req.body.loopParam,
                json.id = req.body.loopParam,
                json.children = []
            loop = findObjectById(json, req.body.loopParam);
        }


        console.log(__dirname + " 3 " + req.body.loopParam);
        if (error) {
            console.error("write error:  " + error.message);
        } else {

            console.log(__dirname + " 4");
            shell.cd("C:/Users/manea/Desktop/Sonia/Licenta/server/rmt");
            console.log(__dirname + ' 5');
            if (shell.exec("rmt.exe < examples/test.rmt > examples/result.txt").code !== 0) {
                shell.echo("Error: rmt failed");
                shell.exit(1);
                shell.cd("../");
                console.log(__dirname + "first");
            }
            console.log("Successful Write to " + caleTest);
        };
        var array = fs.readFileSync(caleResultEx).toString().split("\r\n");
        fs.writeFile(caleResultEx, " ", function (error) {
            if (error) {
                console.error("write error:  " + error.message);
            }
        });
        array.forEach(function (value) {
            if (value.includes("loop") || value.includes("done")) {
                if (value.includes("if")) {
                    value = value.replace("if", "/\\");
                    child = findObjectById(json, value);
                    if (!child) {
                        if (value.includes("done")) {

                            loop.children.push({
                                name: value,
                                id: value
                            });
                        } else {
                            loop.children.push({
                                name: value,
                                id: value,
                                children: []
                            });
                        }
                    }
                    console.log(json);
                }
            };
        });
        shell.cd("../");
        console.log(__dirname + "last");
        console.log("Json first= " + res);
        console.log(json);
        res.json(json);
    });
});

router.post("/circularity", function (req, res) {

var circularities ={
    id:null,
    name:null
};
    try {
        console.log(__dirname + " 1 ");
        fse.copySync("C:/Users/manea/Desktop/Sonia/Licenta/server/rmt/examples/example4.rmt", "C:/Users/manea/Desktop/Sonia/Licenta/server/rmt/examples/test.rmt")
        console.log(__dirname + " 2 ");

    } catch (err) {
        console.error(err)
    }
    fs.appendFile(caleTest, req.body.circParam + ";", function (error) {
        // loop = findObjectById(json, req.body.loopParam);
        // if (json.id == null || loop == null) {
        //     json.name = req.body.loopParam,
        //         json.id = req.body.loopParam,
        //         json.children = []
        //     loop = findObjectById(json, req.body.loopParam);
        // }


        console.log(__dirname + " 3 " + req.body.circParam);
        if (error) {
            console.error("write error:  " + error.message);
        } else {

            console.log(__dirname + " 4");
            shell.cd("C:/Users/manea/Desktop/Sonia/Licenta/server/rmt");
            console.log(__dirname + ' 5');
            if (shell.exec("rmt.exe < examples/test.rmt > examples/result.txt").code !== 0) {
                shell.echo("Error: rmt failed");
         
                shell.exit(1);
                shell.cd("../");
                console.log(__dirname + "first");
            }
            console.log("Successful Write to " + caleTest);
        };
        var array = fs.readFileSync(caleResultEx).toString().split("\r\n");
        fs.writeFile(caleResultEx, " ", function (error) {
            if (error) {
                console.error("write error:  " + error.message);
            }
        });
        array.forEach(function (value) {
           
                if (value.includes("if")) {
                    value = value.replace("if", "/\\");
                    circularities.push({
                        name: value,
                        id: value
                    });
                    console.log(json);
                }
           
            console.log(value);
        });
        shell.cd("../");
        console.log(__dirname + "last");
        console.log("Json first= " );
        console.log(res)
        console.log(array);
        res.json(array);
    });
});

module.exports = router;