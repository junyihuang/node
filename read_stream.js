#!/usr/bin/env node 
fs = require('fs');

filename = process.argv[2];

if (!filename) {
   throw Error('A filename must be specified!');
}

stream = fs.createReadStream(filename);

stream.on('data', function (chunk) {
     process.stdout.write(chunk);
});

stream.on('error', function (err) {
     process.stderr.write("ERROR:" + err.message + "\n");
});
    

