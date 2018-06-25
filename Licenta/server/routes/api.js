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

var proveJson = {
    leftTerm: null,
    rightTerm: null,
    id: null,
    wasRun: false,
    hasChild: false,
    children: []
}
var loop, child, prove;


function findObjectById(element, id) {
    if (element.id === id) {
        return element;
    } else if (element.children != null) {
        var i;
        var result = null;
        for (i = 0; result === null && i < element.children.length; i++) {
            result = findObjectById(element.children[i], id);
        }
        return result;
    }
    return null;
}


// 
router.post("/search", function (req, res) {
    //ver if run on button and initialize the json
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
                fse.copySync("C:/Users/sonia/RMT/Licenta/server/rmt/examples/z-all-examples/search_default.rmt", "C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt")
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
            if (json.id === null || loop === null) {
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


            console.log(array)
            let result = array[0].slice(0, 7);
            console.log(result)
            solutionsNo = array[0].replace(/\D/g, '');
            console.log(solutionsNo, "sol")
            if (result === "Success") {
                // if (!isNaN(solutionsNo)) {
                if (solutionsNo == 0) {
                    console.log("solN", solutionsNo)
                    loop.wasRun = true;
                    loop.hasChild = false;
                } else {
                    console.log("else", solutionsNo)
                    console.log(array)
                    for (let i = 2; i < array.length; i++) {
                        console.log(array[i]);
                        value = array[i];
                        if (!value.includes("Solution")) {
                            value = value.replace("if", "/\\");
                            child = findObjectById(json, value);
                            console.log(child, "child")
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
            } else {
                json.name = "Error: " + array;
                json.id = 0;
                json.hasChild = null;
                json.children = [];
            }
            shell.cd("../");
            res.json(json);
        });
    }, 0);
   
});

router.post("/prove", function (req, res) {
    //ver if run on button and initialize the proveJson

    try {
        if (req.body.textArea) {
            if (req.body.leftTerm && req.body.rightTerm && req.body.system) {
                if (req.body.btnName == "axiom") {
                    fs.writeFile("C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt", req.body.textArea + " " + req.body.btnName + ": ", function (error) {
                        if (error) {
                            console.error("write error:  " + error.message);
                        }
                    });
                } else {
                    fs.writeFile("C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt", req.body.textArea + " " + req.body.btnName + " in " + req.body.system + ": ", function (error) {
                        if (error) {
                            console.error("write error:  " + error.message);
                        }
                    });
                }
            }
        } else {
            try {
                fse.copySync("C:/Users/sonia/RMT/Licenta/server/rmt/examples/z-all-examples/default.rmt", "C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt")
            } catch (err) {
                console.error(err)
            }
        }
    } catch (err) {
        console.error(err)
    }
    setTimeout(() => {
        fs.appendFile("C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt", req.body.leftTerm + " => " + req.body.rightTerm + ";", function (error) {
            if (error) {
                console.error("write error:  " + error.message);
            } else {
                shell.cd("C:/Users/sonia/RMT/Licenta/server/rmt");
                if (shell.exec("rmt.exe < examples/test.rmt > examples/result.txt").code !== 0) {
                    shell.cd("../");
                }
            };
            if (req.body.btn === 'true') {
                console.log("ceva----------------------------", req.body.btn)

                proveJson = {
                    leftTerm: null,
                    rightTerm: null,
                    id: null,
                    wasRun: false,
                    hasChild: false,
                    children: []
                }
            }

            //caut elementul in proveJson
            var param = `${req.body.leftTerm} => ${req.body.rightTerm}`.replace(/\s/g, '')
            prove = findObjectById(proveJson, param);
            if (proveJson.id == null || prove == null) {
                proveJson.leftTerm = `${req.body.leftTerm}`
                proveJson.rightTerm = `${req.body.rightTerm}`;
                proveJson.id = param;
                proveJson.wasRun = true;
                proveJson.hasChild = false;
                proveJson.children = [];
                prove = findObjectById(proveJson, param);
            }

            var array = fs.readFileSync(caleResultEx).toString().split("\r\n");
            // fs.writeFile(caleResultEx, " ", function (error) {
            //     if (error) {
            //         console.error("write error:  " + error.message);
            //     }
            // });


            console.log(array)
            let result = array[0].slice(0, 7);
            console.log(result)
            solutionsNo = array[0].replace(/\D/g, '');
            console.log(solutionsNo, "sol")
            if (result === "Success") {
                console.log("result")
                if (solutionsNo == 0) {
                    var rterm = ""
                    if (array.length == 1) {
                        console.log("solN", solutionsNo)
                        var leftItem = "Result: ";
                        var rightItem = array[0];
                        console.log(rightItem, leftItem, "ceva")
                    } else {
                        for (let i = 0; i < array.length; i++) {
                            rterm += `\n ${array[i]}`
                        };
                        var leftItem = "Result: "
                        var rightItem = rterm;
                        console.log(leftItem, rightItem, "ceva2")

                    }
                    prove.children = [];
                    prove.children.push({
                        leftTerm: leftItem,
                        rightTerm: rightItem,
                        id: valueId,
                        wasRun: true,
                        hasChild: false,
                        children: []
                    });

                } else {
                    console.log("else", solutionsNo)
                    console.log(array)
                    for (let i = 2; i < array.length; i++) {
                        console.log(array[i]);
                        value = array[i];
                        if (!value.includes("Solution")) {
                            value = value.replace("if", "/\\");
                            var term = value.split("=>");
                            var leftItem = term[0];
                            var rightItem = term[1];
                            var valueId = value.replace(/\s/g, '')
                            child = findObjectById(proveJson, valueId);

                            console.log(child, "child")
                            if (!child) {
                                if (prove.children.length == 1 && prove.children[0].leftTerm == "Result: ") {
                                    console.log(prove.children.length, prove.children[0].leftTerm, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

                                    console.log("prove.left=result", )
                                    prove.children = [];
                                }
                                prove.children.push({
                                    leftTerm: leftItem,
                                    rightTerm: rightItem,
                                    id: valueId,
                                    wasRun: false,
                                    hasChild: false,
                                    children: []
                                });
                                prove.wasRun = true;
                                prove.hasChild = true;
                            }
                            console.log(proveJson);
                        }
                        i++;
                    };
                }
            } else {

                result = array[0].slice(0, 5);
                if (result === "Error") {
                    prove.children = [];
                    prove.children.push({
                        leftTerm: "Result: ",
                        rightTerm: array[0],
                        id: 1,
                        wasRun: true,
                        hasChild: false,
                        children: []
                    });
                }
                else {
                    proveJson.leftTerm = "Error "
                    proveJson.rightTerm = array;
                    proveJson.id = 0;
                    proveJson.hasChild = null;
                    proveJson.children = [];
                }
            }
            shell.cd("../");
            res.json(proveJson);
        });
    }, 0);
});



router.post("/circ", function (req, res) {
    if (req.body.textArea) {
        if (req.body.leftTerm && req.body.rightTerm && req.body.leftBtnTerm && req.body.rightBtnTerm)
            console.log(req.body.leftTerm, req.body.rightTerm, req.body.leftBtnTerm, req.body.rightBtnTerm)
        fs.writeFile("C:/Users/sonia/RMT/Licenta/server/rmt/examples/test.rmt", req.body.textArea + "circ " + req.body.leftTerm + " => " + req.body.rightTerm + " : " + req.body.leftBtnTerm + " => " + req.body.rightBtnTerm + ";", function (error) {
            if (error) {
                console.error("write error:  " + error.message);
            } else {
                shell.cd("C:/Users/sonia/RMT/Licenta/server/rmt");
                if (shell.exec("rmt.exe < examples/test.rmt > examples/result.txt").code !== 0) {
                    shell.cd("../");
                }
            };
            if (req.body.btn === 'true') {
                console.log("ceva----------------------------", req.body.btn)

                proveJson = {
                    leftTerm: null,
                    rightTerm: null,
                    id: null,
                    wasRun: false,
                    hasChild: false,
                    children: []
                }
            }

            //caut elementul in proveJson
            var param = `${req.body.leftTerm} => ${req.body.rightTerm}`.replace(/\s/g, '')
            prove = findObjectById(proveJson, param);
            if (proveJson.id == null || prove == null) {
                proveJson.leftTerm = `${req.body.leftTerm}`
                proveJson.rightTerm = `${req.body.rightTerm}`;
                proveJson.id = param;
                proveJson.wasRun = true;
                proveJson.hasChild = false;
                proveJson.children = [];
                prove = findObjectById(proveJson, param);
            }

            var array = fs.readFileSync(caleResultEx).toString().split("\r\n");
            // fs.writeFile(caleResultEx, " ", function (error) {
            //     if (error) {
            //         console.error("write error:  " + error.message);
            //     }
            // });


            console.log(array)
            let result = array[0].slice(0, 7);
            console.log(result)
            solutionsNo = array[0].replace(/\D/g, '');
            console.log(solutionsNo, "sol")
            if (result == "Success") {
                console.log("result")
                if (solutionsNo == 0) {
                    var rterm = "";
                    var valueId = "";

                    if (array.length == 1) {
                        console.log("solN", solutionsNo)
                        var leftItem = "Result: ";
                        var rightItem = array[0];
                        valueId = array[0].replace(/\s/g, '')

                        console.log(leftTerm, rightTerm, "ceva")
                    } else {
                        for (let i = 0; i < array.length; i++) {
                            rterm += `\n ${array[i]}`
                            valueId = valueId + array[i].replace(/\s/g, '')

                        }
                        var leftItem = "Result: ";
                        var rightItem = rterm;
                        console.log(leftTerm, rightTerm, "ceva2")

                    }
                    prove.children = [];
                    prove.children.push({
                        leftTerm: leftItem,
                        rightTerm: rightItem,
                        id: valueId,
                        wasRun: false,
                        hasChild: false,
                        children: []
                    });

                } else {
                    console.log("else", solutionsNo)
                    console.log(array)
                    for (let i = 2; i < array.length; i++) {
                        console.log(array[i]);
                        value = array[i];
                        if (!value.includes("Solution")) {
                            value = value.replace("if", "/\\");
                            var term = value.split("=>");
                            var leftItem = term[0];
                            var rightItem = term[1];
                            var valueId = value.replace(/\s/g, '')
                            child = findObjectById(proveJson, valueId);

                            console.log(child, "child")
                            if (!child) {
                                prove.children.push({
                                    leftTerm: leftItem,
                                    rightTerm: rightItem,
                                    id: valueId,
                                    wasRun: false,
                                    hasChild: false,
                                    children: []
                                });
                                prove.wasRun = true;
                                prove.hasChild = true;
                            }
                            console.log(proveJson);
                        }
                        i++;
                    };
                }
            } else {
                result = array[0].slice(0, 5);
                if (result === "Error") {
                    prove.children = [];
                    prove.children.push({
                        leftTerm: "Result: ",
                        rightTerm: array[0],
                        id: 1,
                        wasRun: true,
                        hasChild: false,
                        children: []
                    });
                }
                else {
                    proveJson.leftTerm = "Error "
                    proveJson.rightTerm = array;
                    proveJson.id = 0;
                    proveJson.hasChild = null;
                    proveJson.children = [];
                }
            }
            shell.cd("../");
            res.json(proveJson);
        });
    }
});


router.post("/examplesList", function (req, res) {
    var data = [];
    fs.readdir('C:/Users/sonia/RMT/Licenta/server/rmt/examples/z-all-examples', (err, files) => {
        console.log(files)
        files.forEach(file => {
            if (file.slice(-3) == "rmt") {
                data.push({
                    name: file,
                    id: file
                });
            }
        });
        res.json(data);
    })
});

router.post("/exampleContent", function (req, res) {
    fs.readdir('C:/Users/sonia/RMT/Licenta/server/rmt/examples/z-all-examples', (err, files) => {
        files.forEach(file => {
            if (req.body.file == file) {
                console.log(file);
                fs.readFile('C:/Users/sonia/RMT/Licenta/server/rmt/examples/z-all-examples/' + file, 'utf-8', function (err, content) {
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