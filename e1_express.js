// exercise the use of express module
//
var app = require('express');

myapp = app();

myapp.get('/greeting/:name?',
          function(req,res,next) {
             var name = req.params.name;
             switch (name?name.toLowerCase():' ') {
                 case 'james':
                 case 'taotao':
                 case 'junyi':
                     res.send('hi  ' + name + ', welcome to node world');
                     break;
                 default:
                     next();
             }
          });

myapp.get('/greeting/*?',
           function(req,res) {
              res.send('hi, user anonymous user, welcome to node world');
          });

myapp.get('/',
           function(req,res) {
              res.send('hi, welcome you to the node world');
          });

var port = 8124;
myapp.listen(port);

console.log("Server started and listening on  " + port );
   
