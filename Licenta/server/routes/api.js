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
var solutionsNo;
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
var caleTest = "C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt";
var caleResult = "C:/Users/sonia/RMT/Licenta/server/rmt/examples/result.txt";
var caleResultEx = "C:/Users/sonia/RMT/Licenta/server/rmt/examples/result.txt";
var caleMaincode = "C:/Users/sonia/RMT/Licenta/server/rmt/examples/maincode.json";
var caleMaincodermt = "C:/Users/sonia/RMT/Licenta/server/rmt/examples/maincode.rmt";
var t1, t2, t3;
var json = {
    name: null,
    id: null,
    hasChild: null,
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
// 
router.post("/fct", function (req, res) {

    if (req.body.btn === 'true') {
        json = {
            name: null,
            id: null,
            wasRun: false,
            hasChild: false,
            children: []
        }
    }

    try {
        if (req.body.textArea) {
            if (req.body.t1 && req.body.t2 && req.body.t3) {
                //search [1,2] in sum :loop(S, N);
                fs.writeFile("C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt", req.body.textArea + "search [" + req.body.t1 + "," + req.body.t2 + "] in " + req.body.t3 + ": ", function (error) {
                    if (error) {
                        console.error("write error:  " + error.message);
                    }
                });

            } else {
                fs.writeFile("C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt", req.body.textArea + "search [1,1] in sum: ", function (error) {
                    if (error) {
                        console.error("write error:  " + error.message);
                    }
                });

            }
        } else {
            try {
                fse.copySync("C:/Users/sonia/RMT/Licenta/server/rmt/examples/example1.rmt", "C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt")
            } catch (err) {
                console.error(err)
            }
        }
    } catch (err) {
        console.error(err)
    }
    setTimeout(() => {
        fs.appendFile("C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt", req.body.loopParam + ";", function (error) {
            if (error) {
                console.error("write error:  " + error.message);
            } else {
                shell.cd("C:/Users/sonia/RMT/Licenta/server/rmt");
                if (shell.exec("rmt.exe < examples/test.rmt > examples/result.txt").code !== 0) {
                    shell.cd("../");
                }
            };

            //caut elementul in json
            loop = findObjectById(json, req.body.loopParam);
            if (json.id == null || loop == null) {
                json.name = req.body.loopParam;
                json.id = req.body.loopParam;
                json.wasRun = true;
                json.hasChild = false;
                json.children = [];
                loop = findObjectById(json, req.body.loopParam);
            }

            var array = fs.readFileSync(caleResultEx).toString().split("\r\n");
            // fs.writeFile(caleResultEx, " ", function (error) {
            //     if (error) {
            //         console.error("write error:  " + error.message);
            //     }
            // });
            solutionsNo = array[0].replace(/(^\d+)(.+$)/i, '$1');
            if (!isNaN(solutionsNo)) {
                if (solutionsNo == 0) {
                    loop.wasRun = true;
                    loop.hasChild = false;
                } else {
                    for (let i = 2; i < array.length; i++) {
                        console.log(array[i]);
                        value = array[i];
                        if (value.includes("if")) {
                            value = value.replace("if", "/\\");
                            child = findObjectById(json, value);
                            if (!child) {
                                loop.children.push({
                                    name: value,
                                    id: value,
                                    wasRun: false,
                                    hasChild: false,
                                    children: []
                                });
                                loop.wasRun = true;
                                loop.hasChild = true;
                            }
                            console.log(json);
                        }
                        i++;
                    };
                }
            }
            else {
                json.name = array;
                json.id = 0;
                json.hasChild = null;
                json.children = [];
            }
            shell.cd("../");
            res.json(json);
        });
    }, 0);
});

router.post("/circularity", function (req, res) {

    var circularities = {
        id: null,
        name: null
    };
    try {
        console.log(__dirname + " 1 ");
        fse.copySync("C:/Users/sonia/RMT/Licenta/server/rmt/examples/example4.rmt", "C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt")
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
            shell.cd("C:/Users/sonia/RMT/Licenta/server/rmt");
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
        console.log("Json first= ");
        console.log(res)
        console.log(array);
        res.json(array);
    });
});


router.post("/sumEx", function (req, res) {
    var data = [];
    fs.readdir('C:/Users/sonia/RMT/Licenta/server/rmt/examples/', (err, files) => {

        files.forEach(file => {
            if(file.slice(-3) == "rmt")
            data.push({
                name: file,
                id: file
            });

        });
        res.json(data);
    })

});
router.post("/fsContent", function (req, res) {
    fs.readdir('C:/Users/sonia/RMT/Licenta/server/rmt/examples/', (err, files) => {
        files.forEach(file => {
            console.log(req.body.fsContent);
            console.log(file);
            if (req.body.fsContent == file) {
                fs.readFile('C:/Users/sonia/RMT/Licenta/server/rmt/examples/' + file, 'utf-8', function (err, content) {
                    if (err) {
                        onError(err);
                        return;
                    }
                    res.json(content);
                });
            }

        });

    })

});
module.exports = router;