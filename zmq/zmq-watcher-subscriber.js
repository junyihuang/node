'use strict';
const 
    zmq = require('zmq'),
    subscriber = zmq.socket('sub');

    //subscribe all messeges
    subscriber.subscribe("");

    //listen on messagee event
    //
    subscriber.on('message', function (data) {
        let 
            message = JSON.parse(data),
            date = new Date(message.time);
        console.log("file '" + message.file + "' changed at "+ date);
    });

    subscriber.connect('tcp://localhost:5432');

