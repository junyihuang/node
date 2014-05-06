// exercise the use of express module
//
var express = require('express');

myapp = express();

myapp.set('view engine','jade');
myapp.set('view options', { layout: true });
myapp.set('views',__dirname + '/views');

myapp.get('/greeting/:name?',
          function(req,res,next) {
             var name = req.params.name;
             switch (name?name.toLowerCase():' ') {
                 case 'james':
                 case 'taotao':
                 case 'junyi':
                     //res.send('hi  ' + name + ', welcome to node world');
                     res.render('greeting',{greeting: name});
                     break;
                 default: 
                     next();
             }
          });

myapp.get('/greeting/*?',
           function(req,res) {
              //res.send('hi, user anonymous user, welcome to node world');
              res.render('greeting',{greeting: null});
          });

myapp.get('/',
           function(req,res) {
              //res.send('hi, welcome you to the node world');
              res.render('index');
          });

var port = 8124;
myapp.listen(port);

console.log("Server started and listening on  " + port );
   
