'use strict'
const 
   fs = require('fs'),
   zmq = require('zmq'),
   
   publisher = zmq.socket('pub'),
   filename = process.argv[2];

   fs.watch(filename, function () {

      publisher.send(JSON.stringify({
         type: 'changed',
         file: filename,
         time: Date.now()
      }));
   });

   publisher.bind('tcp://*:5432', function (err) {
      console.log('Listening for zmq subscribers....');
   });


      
