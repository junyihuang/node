'use strict';
const 
   filename = process.argv[2],
   zmq = require('zmq'),
   request = zmq.socket('req');

   request.on('message', function (data) {
      let response = JSON.parse(data);
      console.log('Receive response :' , response);
   });

   request.connect('tcp://127.0.0.1:5433');

   // send requests with a loop
   for (let i=0; i<100;i++) { 
      console.log('Sending request' + i  + ' for  ' + filename);
      request.send(JSON.stringify( {
         path: filename
      })); 
   }

