// // node-soap functionality ***********************
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// var express = require('express');
// var app = express();
// var path = require('path');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var http = require('http');
// const fs = require('fs');
// const fse = require('fs-extra');
// var cmd = require('node-cmd')
// var shell = require('shelljs');
// const readline = require('readline');
// var jsonfile = require('jsonfile');


// var caleTest = "./rmt/examples/test.rmt";
// var caleResult = "./rmt/examples/result.txt";
// var caleResultEx = "./examples/result.txt";
// var caleMaincode = "./examples/maincode.json";
// var caleMaincodermt = "./rmt/examples/maincode.rmt";



 

// // expose the routes to our app with module.exports
// module.exports = function(app) {
//      app.post('/api/loop', function (req, res) {
//         shell.cd('Desktop/Licenta');
     
//         try {
//             fse.copySync('./rmt/examples/example1.rmt', './rmt/examples/test.rmt')
//             console.log(__dirname)
           
//         } catch (err) {
//                 console.error(err)
//         }
//         fs.appendFile(caleTest, req.body.desc + ';', function (error) {

//             if (error) {
//                 console.error("write error:  " + error.message);
//             } else {

//                 shell.cd('rmt');
//                 if (shell.exec('rmt.exe < examples/test.rmt > examples/result.txt').code !== 0) {
//                     shell.echo('Error: rmt failed');
//                     shell.exit(1);
//                     shell.cd('../');
// 					console.log(__dirname + "first");
//                 }
//                 console.log("Successful Write to " + caleTest);
				
//             };

//             var array = fs.readFileSync(caleResultEx).toString().split('\r\n');
// 			fs.writeFile(caleResultEx, " " , function (error) {

//             if (error) {
//                 console.error("write error:  " + error.message);
//             }
// 			});
//             var loops = [];
//             array.forEach(function (value) {
//                 if (value.includes("loop") || value.includes("done")) {
// //                    if (value.includes("if")) {
// //                      value= value.replace("if",  '/\\');
//                         loops.push(value);
// //                    };
//                 };
//             });
			
// 				shell.cd('../');
// 			console.log(__dirname + "last");
// 			 console.log('Json first= ' + loops);
//             console.log(loops);
//             res.send(loops);

//        //     var jsonobj = './examples/maincode.json';
//        //      var array = fs.readFileSync(caleResultEx).toString().split('\n');
//        //      var obj = {
//        //         table: []
//        //      };
//        //      obj.table.push({ square: req.body.desc});
//        //      var jsonobj = JSON.stringify(obj);

//        //      fs.writeFile(caleMaincode, jsonobj, 'utf8');
//        //      for (i in array) {
//        //         console.log('Array= '+ array[i]);
//        //         var string = array[i];
//        //         var substring = "loop";

//        //         fs.readFile(caleMaincode, 'utf8', function readFileCallback(err, data) {
//        //             if (err) {
//        //                 console.log(err);
//        //                 console.log('Array= ' + array[i]);
//        //             } else { 
//        //                 obj = JSON.parse(data); //now it an object
//        //                 obj.table.push({square: array[i] }); //add some data
//        //             }

//        //         }) ;
               
//        //      }
//        //  jsonobj = JSON.stringify(obj.table); //convert it back to json
//        // //  fs.appendFile(caleMaincode, jsonobj, 'utf8'); // write it back 
//         console.log('Json= ' + loops);
//        // res.send(jsonobj);
//         res.end();
               
//         });
		 
         
//     });

// //
//         app.post('/ceva', function (req, res) {
//        	 try {
//             fse.copySync('./rmt/examples/example1.rmt', './rmt/examples/test.rmt')
//             console.log(__dirname)
           
//         } catch (err) {
//                 console.error(err)
//          }
//         fs.appendFile(caleTest, req.body.name + ';', function (error) {
// 			console.log(req.body.name );
			
//             if (error) {
//                 console.error("write error:  " + error.message);
//             } else {

//                 shell.cd('rmt');
//                 if (shell.exec('rmt.exe < examples/test.rmt > examples/result.txt').code !== 0) {
//                     shell.echo('Error: rmt failed');
//                     shell.exit(1);
//                     shell.cd('../');
//                 }
//                 console.log("Successful Write to " + caleTest );
				
//             };

//             var array = fs.readFileSync(caleResultEx).toString().split('\r\n');
//             var loops = [];
//             array.forEach(function (value) {
//                 if (value.includes("loop") || value.includes("done")) {
//                     // if (value.includes("if")) {
// //                      value= value.replace("if", "/\\" )
//                         loops.push(value);
//                     // };
//                 };
//             });
// 			shell.cd('../');
//             console.log(loops);
//             res.send(loops);
//         console.log('Json= ' + loops);
       
//         res.end();
          
//         });
              
//     });
// //
//      app.post('/run', function (req, res) {
//         shell.cd('Desktop/Licenta');
     
//         try {
//             fse.copySync('./rmt/examples/example5.rmt', './rmt/examples/test.rmt')
//             console.log(__dirname)
           
//         } catch (err) {
//                 console.error(err)
//         }
//         fs.appendFile(caleTest, req.body.desc + ';', function (error) {

//             if (error) {
//                 console.error("write error:  " + error.message);
//             } else {

//                 shell.cd('rmt');
//                 if (shell.exec('rmt.exe < examples/test.rmt > examples/result.txt').code !== 0) {
//                     shell.echo('Error: rmt failed');
//                     shell.exit(1);
//                     shell.cd('../');
//           console.log(__dirname + "first");
//                 }
//                 console.log("Successful Write to " + caleTest);
        
//             };

//             var array = fs.readFileSync(caleResultEx).toString().split('\r\n');
//       fs.writeFile(caleResultEx, " " , function (error) {

//             if (error) {
//                 console.error("write error:  " + error.message);
//             }
//       });
//             var loops = [];
//             array.forEach(function (value) {
//                 if (value.includes("loop") || value.includes("done")) {
//                         loops.push(value);
// //                    };
//                 };
//             });
      
//         shell.cd('../');
//       console.log(__dirname + "last");
//        console.log('Json first= ' + loops);
//             console.log(loops);
//             res.send(loops);

       
//         console.log('Json= ' + loops);
//        // res.send(jsonobj);
//         res.end();
               
//         });
//     });
//         app.post('/func', function (req, res) {
//          try {
//             fse.copySync('./rmt/examples/example5.rmt', './rmt/examples/test.rmt')
//             console.log(__dirname)
           
//         } catch (err) {
//                 console.error(err)
//          }
//         fs.appendFile(caleTest, req.body.name + ';', function (error) {
//       console.log(req.body.name );
      
//             if (error) {
//                 console.error("write error:  " + error.message);
//             } else {

//                 shell.cd('rmt');
//                 if (shell.exec('rmt.exe < examples/test.rmt > examples/result.txt').code !== 0) {
//                     shell.echo('Error: rmt failed');
//                     shell.exit(1);
//                     shell.cd('../');
//                 }
//                 console.log("Successful Write to " + caleTest );
        
//             };

//             var array = fs.readFileSync(caleResultEx).toString().split('\r\n');
//             var loops = [];
//             array.forEach(function (value) {
//                 if (value.includes("loop") || value.includes("done")) {
//                     // if (value.includes("if")) {
// //                      value= value.replace("if", "/\\" )
//                         loops.push(value);
//                     // };
//                 };
//             });
//       shell.cd('../');
//             console.log(loops);
//             res.send(loops);
//         console.log('Json= ' + loops);
       
//         res.end();
          
//         });
              
//     });
//   app.post('/api/homepage', function(req, res) {
    
//     console.log(req.body.inputField);

//     res.json(req.body.inputField);
//   });
          
//   // application -------------------------------------------------------------
//   app.get('*', function(req, res) {
//     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
//   });
// };



