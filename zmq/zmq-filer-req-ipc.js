'use strict';
const 
   filename = process.argv[2],
   zmq = require('zmq'),
   request = zmq.socket('req');

   request.on('message', function (data) {
      let response = JSON.parse(data);
      console.log('Receive response :' , response);
   });

   request.connect('ipc://zmq-filer.ipc');

   // send requests with a loop
   for (let i=0; i<3;i++) { 
      console.log('Sending request: ' + i  + ' for  ' + filename);
      request.send(JSON.stringify( {
         path: filename
      })); 
   }

