'use strict';
const 
   fs = require('fs'),
   zmq = require('zmq');
   let responder = zmq.socket('rep');
   responder.on('message', function (data) {
         // parse the message
        let request = JSON.parse(data);
        console.log(process.pid + 'received request for ' + request.path);
      // read file and reply with content
        fs.readFile(request.path, function(err, data) {
           console.log(process.pid + ' sending response . ');
           responder.send(JSON.stringify( {
           pid: process.pid,
           data: data.toString(),
           time: Date.now()
        }));
   }); // end of fs.read
  }); // end of  respond.message event

  responder.bind('ipc://zmq-filer.ipc'), function (err) {
     console.log('Listening on zmq-filer.ipc for  zmq requesters...');
  }
  console.log('Listening on zmq-filer.ipc for  zmq requesters...');

  process.on('SIGINT', function () {
      responder.close();
  });
  process.on('SIGTER', function () {
      responder.close();
  });


  
