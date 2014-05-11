'use strict';

const 
   cluster = require('cluster'),
   fs = require('fs'),
   zmq = require('zmq');

   if (cluster.isMaster) {
       // master process to create ROUTER and DEALER
       let
          router = zmq.socket('router').bind('tcp://127.0.0.1:5433'),
          dealer = zmq.socket('dealer').bind('ipc://new.filer.dealer.ipc');
          //dealer = zmq.socket('dealer').bind('tcp://127.0.0.1:5434');

        console.log('dealer binds to ipc://new.filer.dealer.ipc');
        //console.log('dealer binds to  tcp://127.0.0.1:5434');

       // forward mesg between router and dealer
       router.on('message', function() {
           let frames = Array.prototype.slice.call(arguments);
           console.log('router received msg', frames);
           dealer.send(frames);
       });
       dealer.on('message', function() {
           let frames = Array.prototype.slice.call(arguments);
           console.log('dealer received response', frames);
           router.send(frames);
       });

       //listen on workes to come online
       cluster.on('online', function (worker) {
          console.log('Worker ' + worker.process.pid + ' is online ' );
       });

       //fork 3 workers
       for (var i=0; i<3 ; i++ ) {
           cluster.fork();
       }

       process.on('SIGINT', function () {
          dealer.close();
          router.close();
       });

 } else {
      // worker process -- Create REP socket , connect to DEALER
      let responder = zmq.socket('rep').connect('ipc://new.filer.dealer.ipc');
      //let responder = zmq.socket('rep').connect('tcp://127.0.0.1:5434');
      console.log(process.pid + ' responder created and connect to ipc://new.filer.dealer.ipc');
      //console.log(process.pid + ' responder created and connect to tcp://127.0.0.1:5434');
      responder.on('message', function (data) {
         // parse the message
         let request = JSON.parse(data);
         console.log(process.pid + ' received request for ' + request.path);
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
} // end of if else
